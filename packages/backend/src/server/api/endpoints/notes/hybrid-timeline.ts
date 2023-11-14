/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Brackets } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import type { NotesRepository, FollowingsRepository, MiNote, ChannelFollowingsRepository } from '@/models/_.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import ActiveUsersChart from '@/core/chart/charts/active-users.js';
import { NoteEntityService } from '@/core/entities/NoteEntityService.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { IdService } from '@/core/IdService.js';
import { isUserRelated } from '@/misc/is-user-related.js';
import { CacheService } from '@/core/CacheService.js';
import { FunoutTimelineService } from '@/core/FunoutTimelineService.js';
import { QueryService } from '@/core/QueryService.js';
import { UserFollowingService } from '@/core/UserFollowingService.js';
import { MetaService } from '@/core/MetaService.js';
import { MiLocalUser } from '@/models/User.js';
import { ApiError } from '../../error.js';

export const meta = {
	tags: ['notes'],

	requireCredential: true,

	res: {
		type: 'array',
		optional: false, nullable: false,
		items: {
			type: 'object',
			optional: false, nullable: false,
			ref: 'Note',
		},
	},

	errors: {
		stlDisabled: {
			message: 'Hybrid timeline has been disabled.',
			code: 'STL_DISABLED',
			id: '620763f4-f621-4533-ab33-0577a1a3c342',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
		sinceId: { type: 'string', format: 'misskey:id' },
		untilId: { type: 'string', format: 'misskey:id' },
		sinceDate: { type: 'integer' },
		untilDate: { type: 'integer' },
		includeMyRenotes: { type: 'boolean', default: true },
		includeRenotedMyNotes: { type: 'boolean', default: true },
		includeLocalRenotes: { type: 'boolean', default: true },
		withFiles: { type: 'boolean', default: false },
		withRenotes: { type: 'boolean', default: true },
		withReplies: { type: 'boolean', default: false },
	},
	required: [],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.notesRepository)
		private notesRepository: NotesRepository,

		@Inject(DI.channelFollowingsRepository)
		private channelFollowingsRepository: ChannelFollowingsRepository,

		private noteEntityService: NoteEntityService,
		private roleService: RoleService,
		private activeUsersChart: ActiveUsersChart,
		private idService: IdService,
		private cacheService: CacheService,
		private funoutTimelineService: FunoutTimelineService,
		private queryService: QueryService,
		private userFollowingService: UserFollowingService,
		private metaService: MetaService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const untilId = ps.untilId ?? (ps.untilDate ? this.idService.gen(ps.untilDate!) : null);
			const sinceId = ps.sinceId ?? (ps.sinceDate ? this.idService.gen(ps.sinceDate!) : null);

			const policies = await this.roleService.getUserPolicies(me.id);
			if (!policies.ltlAvailable) {
				throw new ApiError(meta.errors.stlDisabled);
			}

			const serverSettings = await this.metaService.fetch();

			if (serverSettings.enableFanoutTimeline) {
				const [
					userIdsWhoMeMuting,
					userIdsWhoMeMutingRenotes,
					userIdsWhoBlockingMe,
				] = await Promise.all([
					this.cacheService.userMutingsCache.fetch(me.id),
					this.cacheService.renoteMutingsCache.fetch(me.id),
					this.cacheService.userBlockedCache.fetch(me.id),
				]);

				let noteIds: string[];
				let shouldFallbackToDb = false;

				if (ps.withFiles) {
					const [htlNoteIds, ltlNoteIds] = await this.funoutTimelineService.getMulti([
						`homeTimelineWithFiles:${me.id}`,
						'localTimelineWithFiles',
					], untilId, sinceId);
					noteIds = Array.from(new Set([...htlNoteIds, ...ltlNoteIds]));
				} else if (ps.withReplies) {
					const [htlNoteIds, ltlNoteIds, ltlReplyNoteIds] = await this.funoutTimelineService.getMulti([
						`homeTimeline:${me.id}`,
						'localTimeline',
						'localTimelineWithReplies',
					], untilId, sinceId);
					noteIds = Array.from(new Set([...htlNoteIds, ...ltlNoteIds, ...ltlReplyNoteIds]));
				} else {
					const [htlNoteIds, ltlNoteIds] = await this.funoutTimelineService.getMulti([
						`homeTimeline:${me.id}`,
						'localTimeline',
					], untilId, sinceId);
					noteIds = Array.from(new Set([...htlNoteIds, ...ltlNoteIds]));
					shouldFallbackToDb = htlNoteIds.length === 0;
				}

				noteIds.sort((a, b) => a > b ? -1 : 1);
				noteIds = noteIds.slice(0, ps.limit);

				shouldFallbackToDb = shouldFallbackToDb || (noteIds.length === 0);

				let redisTimeline: MiNote[] = [];

				if (!shouldFallbackToDb) {
					const query = this.notesRepository.createQueryBuilder('note')
						.where('note.id IN (:...noteIds)', { noteIds: noteIds })
						.innerJoinAndSelect('note.user', 'user')
						.leftJoinAndSelect('note.reply', 'reply')
						.leftJoinAndSelect('note.renote', 'renote')
						.leftJoinAndSelect('reply.user', 'replyUser')
						.leftJoinAndSelect('renote.user', 'renoteUser')
						.leftJoinAndSelect('note.channel', 'channel');

					redisTimeline = await query.getMany();

					redisTimeline = redisTimeline.filter(note => {
						if (note.userId === me.id) {
							return true;
						}
						if (isUserRelated(note, userIdsWhoBlockingMe)) return false;
						if (isUserRelated(note, userIdsWhoMeMuting)) return false;
						if (note.renoteId) {
							if (note.text == null && note.fileIds.length === 0 && !note.hasPoll) {
								if (isUserRelated(note, userIdsWhoMeMutingRenotes)) return false;
								if (ps.withRenotes === false) return false;
							}
						}

						return true;
					});

					redisTimeline.sort((a, b) => a.id > b.id ? -1 : 1);
				}

				if (redisTimeline.length > 0) {
					process.nextTick(() => {
						this.activeUsersChart.read(me);
					});

					return await this.noteEntityService.packMany(redisTimeline, me);
				} else { // fallback to db
					return await this.getFromDb({
						untilId,
						sinceId,
						limit: ps.limit,
						includeMyRenotes: ps.includeMyRenotes,
						includeRenotedMyNotes: ps.includeRenotedMyNotes,
						includeLocalRenotes: ps.includeLocalRenotes,
						withFiles: ps.withFiles,
						withReplies: ps.withReplies,
					}, me);
				}
			} else {
				return await this.getFromDb({
					untilId,
					sinceId,
					limit: ps.limit,
					includeMyRenotes: ps.includeMyRenotes,
					includeRenotedMyNotes: ps.includeRenotedMyNotes,
					includeLocalRenotes: ps.includeLocalRenotes,
					withFiles: ps.withFiles,
					withReplies: ps.withReplies,
				}, me);
			}
		});
	}

	private async getFromDb(ps: {
		untilId: string | null,
		sinceId: string | null,
		limit: number,
		includeMyRenotes: boolean,
		includeRenotedMyNotes: boolean,
		includeLocalRenotes: boolean,
		withFiles: boolean,
		withReplies: boolean,
	}, me: MiLocalUser) {
		const followees = await this.userFollowingService.getFollowees(me.id);
		const meOrFolloweeIds = [me.id, ...followees.map(f => f.followeeId)];
		const scoreHurdle = followees.length*0.1 + 20;
		let scoreCount = Math.floor(scoreHurdle);
		if(scoreCount > 100){
			scoreCount = 100;
		}

		let rnLimit = followees.length * 10;
		if(rnLimit > 2000){
			rnLimit = 2000;
		}

		const rnQuery1 = await this.notesRepository.createQueryBuilder('note')
			.select('note.id')
			.select('note.renoteId')
			.select('renote.score')
			.leftJoinAndSelect('note.renote', 'renote')
			.where('note.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
			.andWhere('renote.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
			.andWhere('note.id > :minId', { minId: this.idService.gen(Date.now() - (1000 * 60 * 60 * 24 * 7)) })
			.andWhere('(note.score > :CountScore)', { CountScore: 20 })
			.andWhere('note.userId <> renote.userId')
			.andWhere('note.renoteId IS NOT NULL')
			.andWhere('note.visibility = \'public\'')
			.orderBy('renote.score', 'DESC')
			.limit(rnLimit)

			this.queryService.generateMutedUserQuery(rnQuery1, me);
			this.queryService.generateBlockedUserQuery(rnQuery1, me);
			this.queryService.generateMutedUserRenotesQueryForNotes(rnQuery1, me);

		const rnQuery2 = await this.notesRepository.createQueryBuilder('note')
			.select('note.id')
			.select('note.renoteId')
			.leftJoinAndSelect('note.renote', 'renote')
			.where('note.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
			.andWhere('renote.userId NOT IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
			.andWhere('note.id > :minId', { minId: this.idService.gen(Date.now() - (1000 * 60 * 60 * 24 * 7)) })
			.andWhere('(note.score > :CountScore)', { CountScore: scoreCount })
			.andWhere('note.renoteId IS NOT NULL')
			.andWhere('note.visibility = \'public\'')
			.orderBy('renote.score', 'DESC')
			.limit(rnLimit)

			this.queryService.generateMutedUserQuery(rnQuery2, me);
			this.queryService.generateBlockedUserQuery(rnQuery2, me);
			this.queryService.generateMutedUserRenotesQueryForNotes(rnQuery2, me);
		let rnArray = new Array();
		if (followees.length > 10) {
			const rn1 = await rnQuery1.getMany();
			const rn2 = await rnQuery2.getMany();
			const duplicationRn = [...rn1.map(d => d.renoteId),...rn2.map(d => d.renoteId)];
			rnArray = [...new Set(duplicationRn)];
		}
		const query = this.queryService.makePaginationQuery(this.notesRepository.createQueryBuilder('note'), ps.sinceId, ps.untilId)
			.innerJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.reply', 'reply')
			.leftJoinAndSelect('note.renote', 'renote')
			.leftJoinAndSelect('reply.user', 'replyUser')
			.leftJoinAndSelect('renote.user', 'renoteUser');
			if ((followees.length > 15) && (rnArray.length > 10)) {
				query.andWhere('note.id IN (:...rnArray)', { rnArray: rnArray })
			} else if ((followees.length > 5)){
				query.andWhere('note.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
				query.andWhere('(note.score > :CountScore)', { CountScore: 20 })
				query.andWhere('note.userHost IS NULL')
			} else {
				const recomend = await this.notesRepository.createQueryBuilder('note')
				.select('note.id')
				.andWhere('note.id > :minId', { minId: this.idService.gen(Date.now() - (1000 * 60 * 60 * 24 * 7)) })
				.andWhere('note.visibility = \'public\'')
				.orderBy('note.score', 'DESC')
				.andWhere('note.userHost IS NULL')
				.limit(50);
				const rc = await recomend.getMany();
				const recomendNote = [...rc.map(d => d.id)];
				query.andWhere('note.id IN (:...rnArray)', { rnArray: recomendNote })
			}

		if (!ps.withReplies) {
			query.andWhere(new Brackets(qb => {
				qb
					.where('note.replyId IS NULL') // 返信ではない
					.orWhere(new Brackets(qb => {
						qb // 返信だけど投稿者自身への返信
							.where('note.replyId IS NOT NULL')
							.andWhere('note.replyUserId = note.userId');
					}));
			}));
		}

		this.queryService.generateVisibilityQuery(query, me);
		this.queryService.generateMutedUserQuery(query, me);
		this.queryService.generateBlockedUserQuery(query, me);
		this.queryService.generateMutedUserRenotesQueryForNotes(query, me);

		if (ps.includeMyRenotes === false) {
			query.andWhere(new Brackets(qb => {
				qb.orWhere('note.userId != :meId', { meId: me.id });
				qb.orWhere('note.renoteId IS NULL');
				qb.orWhere('note.text IS NOT NULL');
				qb.orWhere('note.fileIds != \'{}\'');
				qb.orWhere('0 < (SELECT COUNT(*) FROM poll WHERE poll."noteId" = note.id)');
			}));
		}

		if (ps.includeRenotedMyNotes === false) {
			query.andWhere(new Brackets(qb => {
				qb.orWhere('note.renoteUserId != :meId', { meId: me.id });
				qb.orWhere('note.renoteId IS NULL');
				qb.orWhere('note.text IS NOT NULL');
				qb.orWhere('note.fileIds != \'{}\'');
				qb.orWhere('0 < (SELECT COUNT(*) FROM poll WHERE poll."noteId" = note.id)');
			}));
		}

		if (ps.includeLocalRenotes === false) {
			query.andWhere(new Brackets(qb => {
				qb.orWhere('note.renoteUserHost IS NOT NULL');
				qb.orWhere('note.renoteId IS NULL');
				qb.orWhere('note.text IS NOT NULL');
				qb.orWhere('note.fileIds != \'{}\'');
				qb.orWhere('0 < (SELECT COUNT(*) FROM poll WHERE poll."noteId" = note.id)');
			}));
		}

		if (ps.withFiles) {
			query.andWhere('note.fileIds != \'{}\'');
		}
		//#endregion

		const timeline = await query.limit(ps.limit).getMany();

		process.nextTick(() => {
			this.activeUsersChart.read(me);
		});

		return await this.noteEntityService.packMany(timeline, me);
	}
}

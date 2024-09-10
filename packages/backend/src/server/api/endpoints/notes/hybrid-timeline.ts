/*
 * SPDX-FileCopyrightText: syuilo and misskey-project , Type4ny-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Brackets } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import type { NotesRepository, ChannelFollowingsRepository } from '@/models/_.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import ActiveUsersChart from '@/core/chart/charts/active-users.js';
import { NoteEntityService } from '@/core/entities/NoteEntityService.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { IdService } from '@/core/IdService.js';
import { CacheService } from '@/core/CacheService.js';
import { FanoutTimelineName } from '@/core/FanoutTimelineService.js';
import { QueryService } from '@/core/QueryService.js';
import { UserFollowingService } from '@/core/UserFollowingService.js';
import { MetaService } from '@/core/MetaService.js';
import { MiLocalUser } from '@/models/User.js';
import { FanoutTimelineEndpointService } from '@/core/FanoutTimelineEndpointService.js';
import { ApiError } from '../../error.js';

export const meta = {
	tags: ['notes'],

	requireCredential: true,
	kind: 'read:account',

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

		bothWithRepliesAndWithFiles: {
			message: 'Specifying both withReplies and withFiles is not supported',
			code: 'BOTH_WITH_REPLIES_AND_WITH_FILES',
			id: 'dfaa3eb7-8002-4cb7-bcc4-1095df46656f'
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
		allowPartial: { type: 'boolean', default: false }, // true is recommended but for compatibility false by default
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
		private queryService: QueryService,
		private userFollowingService: UserFollowingService,
		private metaService: MetaService,
		private fanoutTimelineEndpointService: FanoutTimelineEndpointService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const untilId = ps.untilId ?? (ps.untilDate ? this.idService.gen(ps.untilDate!) : null);
			const sinceId = ps.sinceId ?? (ps.sinceDate ? this.idService.gen(ps.sinceDate!) : null);

			const policies = await this.roleService.getUserPolicies(me.id);
			if (!policies.ltlAvailable) {
				throw new ApiError(meta.errors.stlDisabled);
			}

			if (ps.withReplies && ps.withFiles) throw new ApiError(meta.errors.bothWithRepliesAndWithFiles);

			const serverSettings = await this.metaService.fetch();

			if (!serverSettings.enableFanoutTimeline) {
				const timeline = await this.getFromDb({
					untilId,
					sinceId,
					limit: ps.limit,
					includeMyRenotes: ps.includeMyRenotes,
					includeRenotedMyNotes: ps.includeRenotedMyNotes,
					includeLocalRenotes: ps.includeLocalRenotes,
					withFiles: ps.withFiles,
					withReplies: ps.withReplies,
				}, me);

				process.nextTick(() => {
					this.activeUsersChart.read(me);
				});

				return await this.noteEntityService.packMany(timeline, me);
			}

			let timelineConfig: FanoutTimelineName[];

			if (ps.withFiles) {
				timelineConfig = [
					`homeTimelineWithFiles:${me.id}`,
					'localTimelineWithFiles',
				];
			} else if (ps.withReplies) {
				timelineConfig = [
					`homeTimeline:${me.id}`,
					'localTimeline',
					'localTimelineWithReplies',
				];
			} else {
				timelineConfig = [
					`homeTimeline:${me.id}`,
					'localTimeline',
					`localTimelineWithReplyTo:${me.id}`,
				];
			}

			const [
				followings,
			] = await Promise.all([
				this.cacheService.userFollowingsCache.fetch(me.id),
			]);

			const redisTimeline = await this.fanoutTimelineEndpointService.timeline({
				untilId,
				sinceId,
				limit: ps.limit,
				allowPartial: ps.allowPartial,
				me,
				redisTimelines: timelineConfig,
				useDbFallback: serverSettings.enableFanoutTimelineDbFallback,
				alwaysIncludeMyNotes: true,
				excludePureRenotes: !ps.withRenotes,
				noteFilter: note => {
					if (note.reply && note.reply.visibility === 'followers') {
						if (!Object.hasOwn(followings, note.reply.userId) && note.reply.userId !== me.id) return false;
					}

					return true;
				},
				dbFallback: async (untilId, sinceId, limit) => await this.getFromDb({
					untilId,
					sinceId,
					limit,
					includeMyRenotes: ps.includeMyRenotes,
					includeRenotedMyNotes: ps.includeRenotedMyNotes,
					includeLocalRenotes: ps.includeLocalRenotes,
					withFiles: ps.withFiles,
					withReplies: ps.withReplies,
				}, me),
			});

			process.nextTick(() => {
				this.activeUsersChart.read(me);
			});

			return redisTimeline;
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
		let scoreCount = Math.floor(followees.length*0.1 + 20);
		if(scoreCount > 100){
			scoreCount = 100;
		}

		let rnLimit = followees.length * 10;
		if(rnLimit > 2500){
			rnLimit = 2500;
		}

		const rnQuery1 = await this.notesRepository.createQueryBuilder('note')
			.select('note.id')
			.select('note.renoteId')
			.select('renote.score')
			.leftJoinAndSelect('note.renote', 'renote')
			.andWhere('(note.userId IN (:...meOrFolloweeIds)) AND (renote.userId IN (:...meOrFolloweeIds))', { meOrFolloweeIds: meOrFolloweeIds })
			.andWhere('note.id > :minId', { minId: this.idService.gen(Date.now() - (1000 * 60 * 60 * 24 * 4)) })
			.andWhere('(renote.score > :CountScore)', { CountScore: 10 })
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
			.andWhere('note.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
			.andWhere('note.id > :minId', { minId: this.idService.gen(Date.now() - (1000 * 60 * 60 * 24 * 4)) })
			.andWhere('(renote.score > :CountScore)', { CountScore: scoreCount })
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
			const duplicationRn1 = [...rn1.map(d => d.renoteId)];
			const rn2 = await rnQuery2.getMany();
			const duplicationRn2 = [...rn2.map(d => d.renoteId)];
			const duplicationRn = duplicationRn1.concat(duplicationRn2);
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

		return await query.limit(ps.limit).getMany();
	}
}

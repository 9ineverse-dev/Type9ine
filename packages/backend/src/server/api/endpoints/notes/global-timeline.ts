import { Brackets } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import type { NotesRepository, FollowingsRepository } from '@/models/index.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { QueryService } from '@/core/QueryService.js';
import { NoteEntityService } from '@/core/entities/NoteEntityService.js';
import { MetaService } from '@/core/MetaService.js';
import ActiveUsersChart from '@/core/chart/charts/active-users.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { IdService } from '@/core/IdService.js';
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
		gtlDisabled: {
			message: 'Global timeline has been disabled.',
			code: 'GTL_DISABLED',
			id: '0332fc13-6ab2-4427-ae80-a9fadffd1a6b',
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
		withReplies: { type: 'boolean', default: false },
	},
	required: [],
} as const;

// eslint-disable-next-line import/no-default-export
@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> {
	constructor(
		@Inject(DI.notesRepository)
		private notesRepository: NotesRepository,

		@Inject(DI.followingsRepository)
		private followingsRepository: FollowingsRepository,

		private noteEntityService: NoteEntityService,
		private queryService: QueryService,
		private roleService: RoleService,
		private activeUsersChart: ActiveUsersChart,
		private idService: IdService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const policies = await this.roleService.getUserPolicies(me ? me.id : null);
			if (!policies.gtlAvailable) {
				throw new ApiError(meta.errors.gtlDisabled);
			}
			const followees = await this.followingsRepository.createQueryBuilder('following')
			.select('following.followeeId')
			.where('following.followerId = :followerId', { followerId: me.id })
			.getMany();

			//#region Construct query
//			const followingQuery = this.followingsRepository.createQueryBuilder('following')
//				.select('following.followeeId')
//				.where('following.followerId = :followerId', { followerId: me.id })
//				.limit(500)
//				.orderBy('following.id','DESC');

			const FolloweeNoteScore = 1;
			const LocalRenoteCount = 2;
			const GlobalRenoteCount = 3;


		//#region Construct query
		const query = this.queryService.makePaginationQuery(this.notesRepository.createQueryBuilder('note'),
			ps.sinceId, ps.untilId, ps.sinceDate, ps.untilDate)
			.andWhere('note.id > :minId', { minId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 7))) })// 7日前まで
			.andWhere('(note.visibility = \'public\')')
			.andWhere('(note.channelId IS NULL)')
			.innerJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.reply', 'reply')
			.leftJoinAndSelect('note.renote', 'renote')
			.leftJoinAndSelect('reply.user', 'replyUser')
			.leftJoinAndSelect('renote.user', 'renoteUser')

			if (followees.length > 0) {
				const meOrFolloweeIds = [me.id, ...followees.map(f => f.followeeId)];

				const followingNetworks = await this.notesRepository.createQueryBuilder('note')
				.select('note.renoteUserId')
				.distinct(true)
				.andWhere('note.id > :minId', { minId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 3))) })
				.andWhere('note.renoteId IS NOT NULL')
				.andWhere('note.text IS NULL')
				.andWhere('note.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
				.getMany();

				const meOrfollowingNetworks = [me.id, ...followingNetworks.map(f => f.renoteUserId), ...followees.map(f => f.followeeId)];

				query.andWhere('note.userId IN (:...meOrfollowingNetworks)', { meOrfollowingNetworks: meOrfollowingNetworks })
				.andWhere(new Brackets(qb =>{
					qb.where(`(note.renoteCount > :GlobalRenoteCount) `,{GlobalRenoteCount:GlobalRenoteCount})
					.orWhere(`(note.userHost IS NULL) AND (note.renoteCount > :LocalRenoteCount)`, {LocalRenoteCount:LocalRenoteCount})
					.orWhere(`(note.score > :FolloweeNoteScore) AND note.userId IN (:...meOrFolloweeIds) `, { meOrFolloweeIds: meOrFolloweeIds ,FolloweeNoteScore:FolloweeNoteScore});
		  }));
			}else {
				query.andWhere(`(note.userHost IS NULL) AND (note.renoteCount > 30)`);
			}

		this.queryService.generateRepliesQuery(query, ps.withReplies, me);
			if (me) {
				this.queryService.generateMutedUserQuery(query, me);
				this.queryService.generateMutedNoteQuery(query, me);
				this.queryService.generateBlockedUserQuery(query, me);
				this.queryService.generateMutedUserRenotesQueryForNotes(query, me);
			}

			if (ps.withFiles) {
				query.andWhere('note.fileIds != \'{}\'');
			}
			//#endregion

			const timeline = await query.limit(ps.limit).getMany();

			process.nextTick(() => {
				if (me) {
					this.activeUsersChart.read(me);
				}
			});

			return await this.noteEntityService.packMany(timeline, me);
		});
	}
}

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

			//#region Construct query
			const followingQuery = this.followingsRepository.createQueryBuilder('following')
				.select('following.followeeId')
				.where('following.followerId = :followerId', { followerId: me.id });



			const DynamicRenoteCount1 = 5;
			const DynamicRenoteCount2 = 10;
			const DynamicRenoteCount3 = 15;
			const DynamicRenoteCount4 = 20;
			const DynamicRenoteCount5 = 30;


		//#region Construct query
		const query = this.queryService.makePaginationQuery(this.notesRepository.createQueryBuilder('note'),
			ps.sinceId, ps.untilId, ps.sinceDate, ps.untilDate)
			.andWhere('note.id > :minId', { minId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 7))) })// 7日前まで
			//.andWhere('(note.renoteCount > :renoteCounter1) OR (renote.renoteCount > :renoteCounter1)',{renoteCounter1:DynamicRenoteCount1})
			//.andWhere('(note.score > :scoreCounter1) OR (renote.score > :scoreCounter1)',{scoreCounter1: DynamicRenoteCount1 * 2})
			.andWhere('(note.visibility = \'public\')')
			.andWhere('(note.channelId IS NULL)')
			.innerJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.reply', 'reply')
			.leftJoinAndSelect('note.renote', 'renote')
			.leftJoinAndSelect('reply.user', 'replyUser')
			.leftJoinAndSelect('renote.user', 'renoteUser')
			.setParameters(followingQuery.getParameters());

		if (me.followingCount > 0 ) {

			query.andWhere(new Brackets(qb =>{
			qb.where(`(note.renoteCount > :renoteCounter5) AND (note.renote IS NULL) AND (note.userHost IS NULL)`,{renoteCounter5:DynamicRenoteCount5})
			.orWhere(`(note.userId IN (${ followingQuery.getQuery() })) AND (note.renoteCount > :renoteCounter1)`, {renoteCounter1:DynamicRenoteCount1 })
			//.orWhere(`(note.id IN (SELECT max_id FROM (SELECT MAX(note.id) max_id FROM note WHERE ((note.id > :minId) AND (note.userId IN (${ followingQuery.getQuery() })) AND ((((note.userHost = renote.userHost) OR (renote.userHost IS NULL)) AND (renote.renoteCount > :renoteCounter3 )) OR ((renote.userId IN (${ followingQuery.getQuery() }))) AND (renote.userHost IS NULL) AND (note.userHost IS NULL) AND (renote.renoteCount > :renoteCounter1 )) OR ((renote.renoteCount > :renoteCounter4 )))) AS distinct_renotes GROUP BY note.renoteId , max_id ORDER BY max_id DESC LIMIT 100))`,{ renoteCounter4:DynamicRenoteCount4 ,renoteCounter3:DynamicRenoteCount3 ,renoteCounter1:DynamicRenoteCount1,minId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 5)))})
			.orWhere(`((renote.renoteCount > :renoteCounter3) AND ( EXISTS (SELECT DISTINCT max_id FROM (SELECT note.id max_id FROM note WHERE ((note.id > :rnminId) AND (note.userId != renote.userId) AND (note.userId IN (${ followingQuery.getQuery() })))) AS distinct_renotes ORDER BY max_id DESC LIMIT 100)))`,{renoteCounter3:DynamicRenoteCount3,rnminId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)))})
			.setParameters(followingQuery.getParameters());
		  }));
		} else {
			query.andWhere(new Brackets(qb =>{
				qb.orWhere('(note.renoteCount > :renoteCounter5) AND (note.renote IS NULL) AND (note.userHost IS NULL)',{renoteCounter5:DynamicRenoteCount5,scoreCounter5: DynamicRenoteCount5 * 2})
				}));
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

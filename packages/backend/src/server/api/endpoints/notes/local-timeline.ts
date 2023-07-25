import { Brackets } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import type { NotesRepository , FollowingsRepository} from '@/models/index.js';
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
		ltlDisabled: {
			message: 'Local timeline has been disabled.',
			code: 'LTL_DISABLED',
			id: '45a6eb02-7695-4393-b023-dd3be9aaaefd',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		withFiles: { type: 'boolean', default: false },
		withReplies: { type: 'boolean', default: false },
		fileType: { type: 'array', items: {
			type: 'string',
		} },
		excludeNsfw: { type: 'boolean', default: false },
		limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
		sinceId: { type: 'string', format: 'misskey:id' },
		untilId: { type: 'string', format: 'misskey:id' },
		sinceDate: { type: 'integer' },
		untilDate: { type: 'integer' },
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
		private metaService: MetaService,
		private roleService: RoleService,
		private activeUsersChart: ActiveUsersChart,
		private idService: IdService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const policies = await this.roleService.getUserPolicies(me.id);
			if (!policies.ltlAvailable) {
				throw new ApiError(meta.errors.ltlDisabled);
			}

			let DynamicRenoteCount1 = 10;
			let DynamicRenoteCount2 = 40;
			let DynamicRenoteCount3 = 60;
			let DynamicRenoteCount4 = 15;
			let DynamicRenoteCount5 = 2;


			if(me.followingCount < 50){
				DynamicRenoteCount1 = 5;
				DynamicRenoteCount2 = 10;
				DynamicRenoteCount3 = 20;
				DynamicRenoteCount4 = 7;
			}else if(me.followingCount < 500){
				DynamicRenoteCount2 = 20;
				DynamicRenoteCount3 = 30;
				DynamicRenoteCount4 = 10;
			}

			const followingQuery = this.followingsRepository.createQueryBuilder('following')
				.select('following.followeeId')
				.where('following.followerId = :followerId', { followerId: me.id });

			//#region Construct query
			const query = this.queryService.makePaginationQuery(this.notesRepository.createQueryBuilder('note'),
				ps.sinceId, ps.untilId, ps.sinceDate, ps.untilDate)
				.andWhere('note.id > :minId', { minId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 10))) }) // 10日前まで
				.andWhere(new Brackets(qb => {
					qb.where(`((note.userId IN (${ followingQuery.getQuery() })) AND (note.renoteCount > :minrenoteCount1) AND (note.renote IS NULL))`,{minrenoteCount1: DynamicRenoteCount1})
						.orWhere(`((note.renoteCount > :minrenoteCount2) AND (note.userHost IS NULL) AND (note.renote IS NULL))`, {minrenoteCount2: DynamicRenoteCount2})
						.orWhere(`((note.renoteCount > :minrenoteCount3) AND (note.renote IS NULL))`, {minrenoteCount3: DynamicRenoteCount3})
						.orWhere(`((note.userId IN (${ followingQuery.getQuery() })) AND (renote.userId NOT IN (${ followingQuery.getQuery() })) AND (renote.renoteCount > :minrenoteCount4)) AND (note.id IN (SELECT max_id from (SELECT MAX(note.id) max_id FROM note WHERE (note.userId IN (${ followingQuery.getQuery() })) GROUP BY note.renoteId) temp))`,{minrenoteCount4: DynamicRenoteCount4})
						.orWhere(`((note.userId IN (${ followingQuery.getQuery() })) AND (note.renoteId IS NOT NULL) AND (note.userHost IS NULL) AND (renote.userId IN (${ followingQuery.getQuery() })) AND (renote.fileIds IS NOT NULL) AND (renote.userHost IS NULL) AND (renote.renoteCount > :minrenoteCount5)) AND (note.userId != renote.userId) AND (note.id IN (SELECT max_id from (SELECT MAX(note.id) max_id FROM note WHERE ((note.userId IN (${ followingQuery.getQuery() })) AND (note.userHost IS NULL) AND (note.userId != renote.userId)) GROUP BY note.renoteId) temp))`,{minrenoteCount5: DynamicRenoteCount5});
				}))
				.andWhere('(note.visibility = \'public\')')
				.andWhere('(note.channelId IS NULL)')
				.innerJoinAndSelect('note.user', 'user')
				.leftJoinAndSelect('note.reply', 'reply')
				.leftJoinAndSelect('note.renote', 'renote')
				.leftJoinAndSelect('reply.user', 'replyUser')
				.leftJoinAndSelect('renote.user', 'renoteUser');

			this.queryService.generateChannelQuery(query, me);
			this.queryService.generateRepliesQuery(query, ps.withReplies, me);
			this.queryService.generateVisibilityQuery(query, me);
			if (me) this.queryService.generateMutedUserQuery(query, me);
			if (me) this.queryService.generateMutedNoteQuery(query, me);
			if (me) this.queryService.generateBlockedUserQuery(query, me);
			if (me) this.queryService.generateMutedUserRenotesQueryForNotes(query, me);

			if (ps.withFiles) {
				query.andWhere('note.fileIds != \'{}\'');
			}

			if (ps.fileType != null) {
				query.andWhere('note.fileIds != \'{}\'');
				query.andWhere(new Brackets(qb => {
					for (const type of ps.fileType!) {
						const i = ps.fileType!.indexOf(type);
						qb.orWhere(`:type${i} = ANY(note.attachedFileTypes)`, { [`type${i}`]: type });
					}
				}));

				if (ps.excludeNsfw) {
					query.andWhere('note.cw IS NULL');
					query.andWhere('0 = (SELECT COUNT(*) FROM drive_file df WHERE df.id = ANY(note."fileIds") AND df."isSensitive" = TRUE)');
				}
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

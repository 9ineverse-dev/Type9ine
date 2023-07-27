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
			const followees = await this.followingsRepository.createQueryBuilder('following')
			.select('following.followeeId')
			.where('following.followerId = :followerId', { followerId: me.id })
			.getMany();

			const meOrFolloweeIds = [me.id, ...followees.map(f => f.followeeId)];

			/*const rnDistinct = await this.notesRepository.createQueryBuilder('note')
			.select('note.id')
			.select('note.renoteId')
			.distinctOn(['note.renoteId'])
			.select('note.renoteId')
			.select('note.userId')
			.select('note.userHost')
			//.where('note.userId IN (:...meOrFolloweeIds)', { meOrFolloweeIds: meOrFolloweeIds })
			.where(new Brackets(qb =>{
				qb.where('(renote.renoteCount > :drrenoteCounter1)',{drrenoteCounter1:1})
				.orWhere('(renote.renoteCount > :drrenoteCounter2) AND (renote.userHost IS NULL)',{drrenoteCounter2:1})
				.orWhere('(renote.renoteCount > :drrenoteCounter3) AND (note.userHost IS NULL)',{drrenoteCounter3:1})
				.orWhere('(renote.renoteCount > :drrenoteCounter4) AND (note.userHost = renote.userHost)',{drrenoteCounter4:1});
			}))
			.orderBy({'note.renoteId':'DESC'})
			.leftJoinAndSelect('note.renote', 'renote')
			.limit(ps.limit)
			.getMany();

			const distinctRns = [ 1, ...rnDistinct.map(d => d.id) ];*/

		//#region Construct query
		const query = this.queryService.makePaginationQuery(this.notesRepository.createQueryBuilder('note'),
			ps.sinceId, ps.untilId, ps.sinceDate, ps.untilDate)
			.andWhere('note.id > :minId', { minId: this.idService.genId(new Date(Date.now() - (1000 * 60 * 60 * 24 * 10))) }) // 10日前まで
			.andWhere('(note.visibility = \'public\')')
			.andWhere('(note.channelId IS NULL)')
			.innerJoinAndSelect('note.user', 'user')
			.leftJoinAndSelect('note.reply', 'reply')
			.leftJoinAndSelect('note.renote', 'renote')
			.leftJoinAndSelect('reply.user', 'replyUser')
			.leftJoinAndSelect('renote.user', 'renoteUser');

		if (followees.length > 0 /*|| distinctRns.length > 0*/) {

			query.andWhere(new Brackets(qb =>{
			qb.orWhere('(note.userId IN (:...meOrFolloweeIds)) AND (note.renoteCount > :renoteCounter1)', { meOrFolloweeIds: meOrFolloweeIds ,renoteCounter1:3 })
			.orWhere('(note.renoteCount > :renoteCounter2) AND (note.renote IS NULL)',{renoteCounter2:60})
			//.orWhere('(note.id IN (:...distinctRns))',{ distinctRns : distinctRns});
			.orWhere('(note.id IN (SELECT max_id from (SELECT MAX(note.id) max_id FROM note WHERE ((note.userId IN (:...meOrFolloweeIds)) AND ((note.userHost = renote.userHost) OR (note.userHost IS NULL)) AND (renote.remnoteCount > 3 ) LIMIT 100 ) GROUP BY note.renoteId) temp)',{ meOrFolloweeIds: meOrFolloweeIds})
			.orWhere('(note.id IN (SELECT max_id from (SELECT MAX(note.id) max_id FROM note WHERE ((note.userId IN (:...meOrFolloweeIds)) AND (renote.userId IN (:...meOrFolloweeIds)) AND (renote.userHost IS NULL) AND (note.userHost IS NULL) AND (renote.remnoteCount > 2 ) LIMIT 100 ) GROUP BY note.renoteId) temp)',{ meOrFolloweeIds: meOrFolloweeIds});
		  }));
		} else {
			query.andWhere('note.userId = :meId', { meId: me.id });
		}

		this.queryService.generateChannelQuery(query, me);
		this.queryService.generateRepliesQuery(query, ps.withReplies, me);
		this.queryService.generateVisibilityQuery(query, me);
		this.queryService.generateMutedUserQuery(query, me);
		this.queryService.generateMutedNoteQuery(query, me);
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
		});
	}
}

/*
 * SPDX-FileCopyrightText: syuilo and misskey-project , Type4ny-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Endpoint } from '@/server/api/endpoint-base.js';
import type { DriveFilesRepository, ChannelsRepository, UsersRepository, MiUser } from '@/models/_.js';
import { ChannelEntityService } from '@/core/entities/ChannelEntityService.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { ApiError } from '../../error.js';

export const meta = {
	tags: ['channels'],

	requireCredential: true,

	kind: 'write:channels',

	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Channel',
	},

	errors: {
		noSuchChannel: {
			message: 'No such channel.',
			code: 'NO_SUCH_CHANNEL',
			id: 'f9c5467f-d492-4c3c-9a8d-a70dacc86512',
		},

		accessDenied: {
			message: 'You do not have edit privilege of the channel.',
			code: 'ACCESS_DENIED',
			id: '1fb7cb09-d46a-4fdf-b8df-057788cce513',
		},

		noSuchFile: {
			message: 'No such file.',
			code: 'NO_SUCH_FILE',
			id: 'e86c14a4-0da2-4032-8df3-e737a04c7f3b',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		channelId: { type: 'string', format: 'misskey:id' },
		name: { type: 'string', minLength: 1, maxLength: 128 },
		description: { type: 'string', nullable: true, minLength: 1, maxLength: 2048 },
		bannerId: { type: 'string', format: 'misskey:id', nullable: true },
		isArchived: { type: 'boolean', nullable: true },
		searchable: { type: 'boolean', nullable: true },
		pinnedNoteIds: {
			type: 'array',
			items: {
				type: 'string', format: 'misskey:id',
			},
		},
		isPrivate: { type: 'boolean', nullable: true },
		privateUserIds: {
			type: 'array',
			items: {
				type: 'string', format: 'misskey:id',
			},
		},
		color: { type: 'string', minLength: 1, maxLength: 16 },
		isSensitive: { type: 'boolean', nullable: true },
		allowRenoteToExternal: { type: 'boolean', nullable: true },
		collaboratorIds: {
			type: 'array',
			items: {
				type: 'string', format: 'misskey:id',
			},
		},
		transferAdminUserId: { type: 'string', format: 'misskey:id', nullable: true },
	},
	required: ['channelId'],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.channelsRepository)
		private channelsRepository: ChannelsRepository,

		@Inject(DI.driveFilesRepository)
		private driveFilesRepository: DriveFilesRepository,

		@Inject(DI.usersRepository)
		private usersRepository: UsersRepository,

		private channelEntityService: ChannelEntityService,

		private roleService: RoleService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const channel = await this.channelsRepository.findOneBy({
				id: ps.channelId,
			});

			if (channel == null) {
				throw new ApiError(meta.errors.noSuchChannel);
			}

			const iAmModerator = await this.roleService.isModerator(me);
			const policies = await this.roleService.getUserPolicies(me.id);
			const root_policies = await this.roleService.getUserPolicies(channel.userId);

			if (!( iAmModerator || channel.userId === me.id || channel.collaboratorIds.includes(me.id) )) {
				throw new ApiError(meta.errors.accessDenied);
			}

			// eslint:disable-next-line:no-unnecessary-initializer
			let banner = undefined;
			if (ps.bannerId != null) {
				banner = await this.driveFilesRepository.findOneBy({
					id: ps.bannerId,
					userId: me.id,
				});

				if (banner == null) {
					throw new ApiError(meta.errors.noSuchFile);
				}
			} else if (ps.bannerId === null) {
				banner = null;
			}

			let collaboratorIds: MiUser['id'][] = [];
			if (ps.collaboratorIds) {
				collaboratorIds = (await this.usersRepository.findBy({
					id: In(ps.collaboratorIds),
				})).map(u => u.id);
			}

			if (!( channel.userId === me.id || iAmModerator )) {
				collaboratorIds = channel.collaboratorIds;
			}

			if (channel.isPrivate || ps.isPrivate) {
				collaboratorIds = collaboratorIds.filter((u) => (ps.privateUserIds !== undefined ? ps.privateUserIds : channel.privateUserIds).includes(u));
			}

			const updateValues = {
				...(ps.name !== undefined ? { name: ps.name } : {}),
				...(ps.description !== undefined ? { description: ps.description } : {}),
				...(ps.pinnedNoteIds !== undefined ? { pinnedNoteIds: ps.pinnedNoteIds } : {}),
				...(ps.color !== undefined ? { color: ps.color } : {}),
				...((typeof ps.isArchived === 'boolean' && ( channel.userId === me.id || iAmModerator )) ? { isArchived: ps.isArchived } : {}),
				...(typeof ps.searchable === 'boolean' ? { searchable: ps.searchable } : {}),
				...(banner ? { bannerId: banner.id } : {}),
				...(typeof ps.isSensitive === 'boolean' ? { isSensitive: ps.isSensitive } : {}),
				...(typeof ps.allowRenoteToExternal === 'boolean' ? { allowRenoteToExternal: ps.allowRenoteToExternal } : {}),
				...(typeof ps.isPrivate === 'boolean' && ( policies.canCreatePrivateChannel ) && ( iAmModerator || channel.userId === me.id) ? { isPrivate: ps.isPrivate } : {}),
				...(ps.privateUserIds !== undefined && ( root_policies.canCreatePrivateChannel ) ? { privateUserIds: ps.privateUserIds } : {}),
				...(ps.collaboratorIds !== undefined  ? { collaboratorIds: collaboratorIds } : {}),
			};

			if (Object.keys(updateValues).length > 0) {
				await this.channelsRepository.update(channel.id, updateValues);
			}

			if (ps.transferAdminUserId && ( channel.userId === me.id || iAmModerator ) && !ps.isPrivate) {
				await this.channelsRepository.update(channel.id, {
					userId: ps.transferAdminUserId,
				});
			}

			return await this.channelEntityService.pack(channel.id, me);
		});
	}
}

/*
 * SPDX-FileCopyrightText: syuilo and misskey-project , Type4ny-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';
import { Endpoint } from '@/server/api/endpoint-base.js';
import type { ChannelsRepository } from '@/models/_.js';
import { ChannelEntityService } from '@/core/entities/ChannelEntityService.js';
import { DI } from '@/di-symbols.js';

export const meta = {
	tags: ['channels'],

	requireCredential: false,

	res: {
		type: 'array',
		optional: false, nullable: false,
		items: {
			type: 'object',
			optional: false, nullable: false,
			ref: 'Channel',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {},
	required: [],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.channelsRepository)
		private channelsRepository: ChannelsRepository,

		private channelEntityService: ChannelEntityService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const query = this.channelsRepository.createQueryBuilder('channel')
				.where('channel.lastNotedAt IS NOT NULL')
				.andWhere('channel.isArchived = FALSE')
				//.andWhere('channel.searchable = TRUE')
				.andWhere(new Brackets(qb => { qb
					.where('channel.isPrivate = FALSE')
					.orWhere(new Brackets(qb2 => { qb2
						.where('channel.isPrivate = TRUE')
						.andWhere(new Brackets(qb3 => { qb3
							.where(':id = ANY(channel.privateUserIds)', { id: me?.id })
							.orWhere('channel.userId = :id', { id: me?.id });
						}));
					}));
				}))
				.orderBy('channel.lastNotedAt', 'DESC');

			const channels = await query.limit(10).getMany();

			return await Promise.all(channels.map(x => this.channelEntityService.pack(x, me)));
		});
	}
}

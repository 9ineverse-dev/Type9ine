import ms from 'ms';
import { Stripe } from 'stripe';
import { Inject, Injectable } from '@nestjs/common';
import type { UserProfilesRepository } from '@/models/index.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { MetaService } from '@/core/MetaService.js';
import type { Config } from '@/config.js';
import { ApiError } from '../../error.js';

export const meta = {
	tags: ['subscription'],

	requireCredential: true,

	limit: {
		duration: ms('1hour'),
		max: 10,
		minInterval: ms('1sec'),
	},

	errors: {
		noSuchNote: {
			message: 'No such user.',
			code: 'NO_SUCH_USER',
			id: '7395f881-39e9-4c21-bd62-f3dd4a0f19b3',
		},

		accessDenied: {
			message: 'Access denied.',
			code: 'ACCESS_DENIED',
			id: 'fe8d7103-0ea8-4ec3-814d-f8b401dc69e9',
		},
	},
} as const;

export const paramDef = {
} as const;

// eslint-disable-next-line import/no-default-export
@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> {
	constructor(
		@Inject(DI.config)
		private config: Config,
		@Inject(DI.usersRepository)
		private userProfilesRepository: UserProfilesRepository,
		private roleService: RoleService,
		private metaService: MetaService,

	) {
		super(meta, paramDef, async (ps, me) => {
			const instance = await this.metaService.fetch(true);
			if (!(instance.stripeAPIKey && instance.stripeWebhookKey && instance.basicPlanPriceId && instance.basicPlanRoleId) || instance.sellSubscription === false) {return {
				redirect: {
					permanent: false,
					destination: '${this.config.url}',
				} };
			}
			const stripe = new Stripe('instance.stripeAPIKey', { apiVersion: '2023-08-16' });

//			const stripe_old = require('stripe')(instance.stripeAPIKey);

			if (!me) {return {
				redirect: {
					permanent: false,
					destination: '{this.config.url}',
				} };
			}

			let subscribeUser = await this.userProfilesRepository.findOneByOrFail({ userId: me.id });

			if (!subscribeUser.email) {return {
				redirect: {
					permanent: false,
					destination: '{this.config.url}',
				} };
			}

			if (!subscribeUser.stripeCustomerId) {
				const makeCustomer = await stripe.customers.create({
					email: subscribeUser.email,
				});
				await this.userProfilesRepository.update({ userId: me.id }, {
					stripeCustomerId: makeCustomer.id,
				});
				subscribeUser = await this.userProfilesRepository.findOneByOrFail({ userId: me.id });
			}

			const portalSession = await stripe.billingPortal.sessions.create({
				customer: subscribeUser.stripeCustomerId,
				return_url: `${this.config.url}`,
			});
			return {
				redirect: {
					permanent: false,
					destination: portalSession.url,
				}
			};
		});
	}
}

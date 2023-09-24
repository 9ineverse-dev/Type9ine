import ms from 'ms';
import { Stripe } from 'stripe';
import { Inject, Injectable } from '@nestjs/common';
import type { UserProfilesRepository, RolesRepository } from '@/models/index.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { MetaService } from '@/core/MetaService.js';
import type { Config } from '@/config.js';
//import type { FastifyReply } from 'fastify';
import { ApiError } from '../../error.js';

export const meta = {
	tags: ['subscription'],

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
		@Inject(DI.userProfilesRepository)
		private userProfilesRepository: UserProfilesRepository,
		@Inject(DI.rolesRepository)
		private rolesRepository: RolesRepository,
		private roleService: RoleService,
		private metaService: MetaService,
//		private reply: FastifyReply,

	) {
		super(meta, paramDef, async ( ps, me, token, file, aa, ip, headers, bodys ) => {
			const instance = await this.metaService.fetch(true);
			if (!(instance.stripeAPIKey && instance.stripeWebhookKey && instance.basicPlanPriceId && instance.basicPlanRoleId) || instance.sellSubscription === false) {
				return;
			}
			const stripe = new Stripe(instance.stripeAPIKey, { apiVersion: '2023-08-16' });
			let data;
			let eventType;
			// Check if webhook signing is configured.
			const webhookSecret = instance.stripeWebhookKey;
			if (webhookSecret) {
				// Retrieve the event by verifying the signature using the raw body and secret.
				let event;
				const signature = headers!['stripe-signature'];
				const req = JSON.stringify(bodys);
				const buf = bodys!.rawBody;
				try {
					event = stripe.webhooks.constructEvent(
						(req as any).rawBody,
						signature,
						webhookSecret);
				} catch (err) {
					return {
						redirect: {
							construct: 'failed',
							err: err,
							req: (req as any).rawBody,
						}
					};
				}
				// Extract the object from the event.
				data = event.data;
				eventType = event.type;
			} else {
				// Webhook signing is recommended, but if the secret is not configured in `config.js`,
				// retrieve the event data directly from the request body.
				data = ps.body.data;
				eventType = ps.body.type;
			}
			switch (eventType) {
				case 'checkout.session.completed':{
					//if ( !instance.basicPlanRoleId ) { break; }
					const role = await this.rolesRepository.findOneBy({ id: instance.basicPlanRoleId });
					//if (role == null) { break; }
					const user = await this.userProfilesRepository.findOneBy({ stripeCustomerId: ps.customers });
					//if (user == null) { break; }
					await this.roleService.assign(user!.userId, role!.id, null);
					break;
				}
				case 'customer.subscription.deleted':{
					if ( !instance.basicPlanRoleId ) { break; }
					const role = await this.rolesRepository.findOneBy({ id: instance.basicPlanRoleId });
					if (role == null) { break; }
					const user = await this.userProfilesRepository.findOneBy({ stripeCustomerId: ps.customers });
					if (user == null) { break; }
					await this.roleService.unassign(user.userId, role.id);
					break;
				}
				case 'invoice.payment_failed':{
					if ( !instance.basicPlanRoleId ) { break; }
					const role = await this.rolesRepository.findOneBy({ id: instance.basicPlanRoleId });
					if (role == null) { break; }
					const user = await this.userProfilesRepository.findOneBy({ stripeCustomerId: ps.customers });
					if (user == null) { break; }
					await this.roleService.unassign(user.userId, role.id);
					break;
				}
				default:
      // Unhandled event type
			}
			return;
		});
	}
}

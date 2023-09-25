import { Inject, Injectable } from '@nestjs/common';
import type { UserProfilesRepository, RolesRepository } from '@/models/index.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { DI } from '@/di-symbols.js';
import { RoleService } from '@/core/RoleService.js';
import { MetaService } from '@/core/MetaService.js';
import { ApiError } from '@/server/api/error.js';

export const meta = {
	tags: ['admin', 'subscription'],

	requireCredential: true,
	requireAdmin: true,

} as const;

export const paramDef = {
	type: 'object',
	properties: {
		customer: { type: 'string' },
		planPriceId: { type: 'string' },
	},
	required: ['customer'],
} as const;

// eslint-disable-next-line import/no-default-export
@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> {
	constructor(
		@Inject(DI.userProfilesRepository)
		private userProfilesRepository: UserProfilesRepository,
		@Inject(DI.rolesRepository)
		private rolesRepository: RolesRepository,
		private roleService: RoleService,
		private metaService: MetaService,

	) {
		super(meta, paramDef, async (ps) => {
			const instance = await this.metaService.fetch(true);
			if ( !instance.basicPlanRoleId ) { return; }
			const role = await this.rolesRepository.findOneBy({ id: instance.basicPlanRoleId });
			if (role == null) { return; }
			const user = await this.userProfilesRepository.findOneBy({ stripeCustomerId: ps.customer });
			if (user == null) { return; }
			await this.roleService.unassign(user!.userId, role!.id);
			return;
		});
	}
}

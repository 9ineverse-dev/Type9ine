/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class  StripeCustomerid1695485811086 {
    name = 'StripeCustomerid1695485811086'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "stripeCustomerId" character varying(128)`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."stripeCustomerId" IS 'The user ID to be used with Stripe Subscription'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT true`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."stripeCustomerId" IS 'The user ID to be used with Stripe Subscription'`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "stripeCustomerId"`);
    }
}

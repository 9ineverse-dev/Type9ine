/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class StripeAdmin1694587426596 {
    name = 'StripeAdmin1694587426596'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "sellSubscription" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "stripeAPIKey" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "stripeWebhookKey" character varying(1024)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "stripeWebhookKey"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "stripeAPIKey"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "sellSubscription"`);
    }
}

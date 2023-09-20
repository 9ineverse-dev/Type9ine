/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class StripeSubscription1695229740791 {
    name = 'StripeSubscription1695229740791'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "basicPlanRoleId" character varying(32)`);
        await queryRunner.query(`COMMENT ON COLUMN "meta"."basicPlanRoleId" IS 'The ID of source Role.'`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "basicPlanPriceId" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "basicPlanPrice" integer`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "transactionsActNotationUrl" character varying(1024)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "transactionsActNotationUrl"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "basicPlanPrice"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "basicPlanPriceId"`);
        await queryRunner.query(`COMMENT ON COLUMN "meta"."basicPlanRoleId" IS 'The ID of source Role.'`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "basicPlanRoleId"`);
    }
}

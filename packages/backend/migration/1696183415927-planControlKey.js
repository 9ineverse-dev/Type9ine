/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class PlanControlKey1696183415927 {
    name = 'PlanControlKey1696183415927'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "planAssignControlKey" character varying(1024)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "planAssignControlKey"`);
    }
}

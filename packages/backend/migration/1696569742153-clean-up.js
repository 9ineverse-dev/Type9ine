/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class CleanUp1696569742153 {
    name = 'CleanUp1696569742153'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_01f4581f114e0ebd2bbb876f0b"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_01f4581f114e0ebd2bbb876f0b" ON "note_reaction" ("createdAt") `);
    }
}

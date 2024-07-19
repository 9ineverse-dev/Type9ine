/*
 * SPDX-FileCopyrightText: syuilo and misskey-project , Type4ny-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class DiscordWebhookUrl1697641012204 {
	name = 'DiscordWebhookUrl1697641012204';

	async up(queryRunner) {
		await queryRunner.query('ALTER TABLE "meta" ADD "DiscordWebhookUrl" character varying(1024)');
	}

	async down(queryRunner) {
		await queryRunner.query('ALTER TABLE "meta" DROP COLUMN "DiscordWebhookUrl"');
	}
}

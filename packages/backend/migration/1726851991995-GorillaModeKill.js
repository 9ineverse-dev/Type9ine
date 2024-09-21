export class GorillaModeKill1726851991995 {
	name = 'GorillaModeKill1726851991995';

	async up(queryRunner) {
		await queryRunner.query('ALTER TABLE "user" DROP COLUMN "isGorilla"');
	}

	async down(queryRunner) {
		await queryRunner.query('ALTER TABLE "user" ADD "isGorilla" boolean NOT NULL DEFAULT false');
	}
}

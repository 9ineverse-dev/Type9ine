
export class RecreateNotescore1725987936657 {
    name = 'RecreateNotescore1725987936657'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "note" ADD "score" integer NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "score"`);
		}
}

export class MakefailedRoleId1700188746508 {
    name = 'MakefailedRoleId1700188746508'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "failedRoleId" character varying(32)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "failedRoleId"`);
    }
}

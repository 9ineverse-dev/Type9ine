export class Whitelists1709282642568 {
    name = 'Whitelists1709282642568'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "defaultWhiteHosts" character varying(1024) array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "userWhiteInstances" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."userWhiteInstances" IS 'List of instances muted by the user.'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."userWhiteInstances" IS 'List of instances muted by the user.'`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "userWhiteInstances"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "defaultWhiteHosts"`);
    }
}

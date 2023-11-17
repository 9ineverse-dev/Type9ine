const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class MakefailedRoleId1700188746508 {
    name = 'MakefailedRoleId1700188746508'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "failedRoleId" character varying(32)`);
        await queryRunner.query(`COMMENT ON COLUMN "meta"."failedRoleId" IS 'The ID of source Role.'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
        await queryRunner.query(`ALTER TABLE "flash" ALTER COLUMN "visibility" SET NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "flash" ALTER COLUMN "visibility" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "meta"."failedRoleId" IS 'The ID of source Role.'`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "failedRoleId"`);
    }
}

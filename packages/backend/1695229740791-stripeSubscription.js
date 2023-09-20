const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class StripeSubscription1695229740791 {
    name = 'StripeSubscription1695229740791'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "basicPlanRoleId" character varying(32)`);
        await queryRunner.query(`COMMENT ON COLUMN "meta"."basicPlanRoleId" IS 'The ID of source Role.'`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "basicPlanPriceId" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "basicPlanPrice" integer`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "transactionsActNotationUrl" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "transactionsActNotationUrl"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "basicPlanPrice"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "basicPlanPriceId"`);
        await queryRunner.query(`COMMENT ON COLUMN "meta"."basicPlanRoleId" IS 'The ID of source Role.'`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "basicPlanRoleId"`);
    }
}

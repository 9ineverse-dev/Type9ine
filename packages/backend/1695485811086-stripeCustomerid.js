const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class StripeCustomerid1695485811086 {
    name = 'StripeCustomerid1695485811086'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "stripeCustomerId" character varying(128)`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."stripeCustomerId" IS 'The user ID to be used with Stripe Subscription'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."stripeCustomerId" IS 'The user ID to be used with Stripe Subscription'`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "stripeCustomerId"`);
    }
}

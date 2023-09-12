const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SubscriptionStripeAdmin1694546013849 {
    name = 'SubscriptionStripeAdmin1694546013849'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT false`);
    }
}

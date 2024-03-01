const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Whitelists1709282642568 {
    name = 'Whitelists1709282642568'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_NOTE_FILE_IDS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_NOTE_TAGS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_NOTE_MENTIONS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_NOTE_VISIBLE_USER_IDS"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "isPR"`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "defaultWhiteHosts" character varying(1024) array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "userWhiteInstances" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."userWhiteInstances" IS 'List of instances muted by the user.'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "disableRegistration" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{ "admin", "administrator", "root", "system", "maintainer", "host", "mod", "moderator", "owner", "superuser", "staff", "auth", "i", "me", "everyone", "all", "mention", "mentions", "example", "user", "users", "account", "accounts", "official", "help", "helps", "support", "supports", "info", "information", "informations", "announce", "announces", "announcement", "announcements", "notice", "notification", "notifications", "dev", "developer", "developers", "tech", "misskey" }'`);
        await queryRunner.query(`ALTER TYPE "public"."user_profile_followersVisibility_enum" RENAME TO "user_profile_followersVisibility_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_followersvisibility_enum" AS ENUM('public', 'followers', 'private')`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "followersVisibility" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "followersVisibility" TYPE "public"."user_profile_followersvisibility_enum" USING "followersVisibility"::"text"::"public"."user_profile_followersvisibility_enum"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "followersVisibility" SET DEFAULT 'public'`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_followersVisibility_enum_old"`);
        await queryRunner.query(`ALTER TABLE "flash" ALTER COLUMN "visibility" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_51c063b6a133a9cb87145450f5" ON "note" ("fileIds") `);
        await queryRunner.query(`CREATE INDEX "IDX_796a8c03959361f97dc2be1d5c" ON "note" ("visibleUserIds") `);
        await queryRunner.query(`CREATE INDEX "IDX_54ebcb6d27222913b908d56fd8" ON "note" ("mentions") `);
        await queryRunner.query(`CREATE INDEX "IDX_88937d94d7443d9a99a76fa5c0" ON "note" ("tags") `);
        await queryRunner.query(`CREATE INDEX "IDX_58699f75b9cf904f5f007909cb" ON "user_profile" ("birthday") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_58699f75b9cf904f5f007909cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88937d94d7443d9a99a76fa5c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54ebcb6d27222913b908d56fd8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_796a8c03959361f97dc2be1d5c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51c063b6a133a9cb87145450f5"`);
        await queryRunner.query(`ALTER TABLE "flash" ALTER COLUMN "visibility" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_followersVisibility_enum_old" AS ENUM('public', 'followers', 'private')`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "followersVisibility" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "followersVisibility" TYPE "public"."user_profile_followersVisibility_enum_old" USING "followersVisibility"::"text"::"public"."user_profile_followersVisibility_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "followersVisibility" SET DEFAULT 'public'`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_followersvisibility_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_profile_followersVisibility_enum_old" RENAME TO "user_profile_followersVisibility_enum"`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "preservedUsernames" SET DEFAULT '{admin,administrator,root,system,maintainer,host,mod,moderator,owner,superuser,staff,auth,i,me,everyone,all,mention,mentions,example,user,users,account,accounts,official,help,helps,support,supports,info,information,informations,announce,announces,announcement,announcements,notice,notification,notifications,dev,developer,developers,tech,misskey}'`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "cacheRemoteFiles" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "meta" ALTER COLUMN "disableRegistration" SET DEFAULT true`);
        await queryRunner.query(`COMMENT ON COLUMN "user_profile"."userWhiteInstances" IS 'List of instances muted by the user.'`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "userWhiteInstances"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "defaultWhiteHosts"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "isPR" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE INDEX "IDX_NOTE_VISIBLE_USER_IDS" ON "note" ("visibleUserIds") `);
        await queryRunner.query(`CREATE INDEX "IDX_NOTE_MENTIONS" ON "note" ("mentions") `);
        await queryRunner.query(`CREATE INDEX "IDX_NOTE_TAGS" ON "note" ("tags") `);
        await queryRunner.query(`CREATE INDEX "IDX_NOTE_FILE_IDS" ON "note" ("fileIds") `);
    }
}

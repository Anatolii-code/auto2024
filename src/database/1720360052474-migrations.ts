import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720360052474 implements MigrationInterface {
    name = 'Migrations1720360052474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "type" text, "role" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, "model" text NOT NULL, "price" text NOT NULL, "valute" text NOT NULL, "locate" text NOT NULL, "description" text NOT NULL, "body" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae7537f375649a618fff0fb2cb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "views_cars_cars" ("viewsId" uuid NOT NULL, "carsId" uuid NOT NULL, CONSTRAINT "PK_bccebfcdad937eb45322b72fc3b" PRIMARY KEY ("viewsId", "carsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef082f10770551f63166ff3a5c" ON "views_cars_cars" ("viewsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1ae5dad065490c59e0a822cae0" ON "views_cars_cars" ("carsId") `);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "views_cars_cars" ADD CONSTRAINT "FK_ef082f10770551f63166ff3a5c4" FOREIGN KEY ("viewsId") REFERENCES "views"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "views_cars_cars" ADD CONSTRAINT "FK_1ae5dad065490c59e0a822cae07" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "views_cars_cars" DROP CONSTRAINT "FK_1ae5dad065490c59e0a822cae07"`);
        await queryRunner.query(`ALTER TABLE "views_cars_cars" DROP CONSTRAINT "FK_ef082f10770551f63166ff3a5c4"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ae5dad065490c59e0a822cae0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef082f10770551f63166ff3a5c"`);
        await queryRunner.query(`DROP TABLE "views_cars_cars"`);
        await queryRunner.query(`DROP TABLE "views"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}

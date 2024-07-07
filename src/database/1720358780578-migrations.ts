import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720358780578 implements MigrationInterface {
    name = 'Migrations1720358780578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "brand" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "model" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "valute" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "locate" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "locate"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "valute"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "title" text NOT NULL`);
    }

}

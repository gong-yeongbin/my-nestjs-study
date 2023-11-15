import { MigrationInterface, QueryRunner } from 'typeorm';

export class Regions1700042258111 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE regions (region_id INT (11) UNSIGNED NOT NULL, region_name VARCHAR(25), PRIMARY KEY (region_id))`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Countries1700042962563 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE countries (country_id CHAR(2) NOT NULL, country_name VARCHAR(40), region_id INT (11) UNSIGNED NOT NULL, PRIMARY KEY (country_id));`
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

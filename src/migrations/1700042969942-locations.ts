import { MigrationInterface, QueryRunner } from 'typeorm';

export class Locations1700042969942 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE locations (location_id INT (11) UNSIGNED NOT NULL AUTO_INCREMENT, street_address VARCHAR(40), postal_code VARCHAR(12), city VARCHAR(30) NOT NULL, state_province VARCHAR(25), country_id CHAR(2) NOT NULL, PRIMARY KEY (location_id));`
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

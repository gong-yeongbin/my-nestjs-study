import { MigrationInterface, QueryRunner } from 'typeorm';

export class Departments1700042981654 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE departments (department_id INT (11) UNSIGNED NOT NULL, department_name VARCHAR(30) NOT NULL, manager_id INT (11) UNSIGNED, location_id INT (11) UNSIGNED, PRIMARY KEY (department_id));`
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

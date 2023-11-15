import { MigrationInterface, QueryRunner } from 'typeorm';

export class Jobs1700042988624 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE jobs (job_id VARCHAR(10) NOT NULL, job_title VARCHAR(35) NOT NULL, min_salary DECIMAL(8, 0) UNSIGNED, max_salary DECIMAL(8, 0) UNSIGNED, PRIMARY KEY (job_id));`
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

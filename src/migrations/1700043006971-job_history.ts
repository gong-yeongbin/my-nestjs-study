import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobHistory1700043006971 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE job_history (
                                                                employee_id INT (11) UNSIGNED NOT NULL,
                                                                start_date DATE NOT NULL,
                                                                end_date DATE NOT NULL,
                                                                job_id VARCHAR(10) NOT NULL,
                                                                department_id INT (11) UNSIGNED NOT NULL
                                                                );`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

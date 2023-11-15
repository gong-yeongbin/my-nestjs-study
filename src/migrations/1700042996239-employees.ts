import { MigrationInterface, QueryRunner } from 'typeorm';

export class Employees1700042996239 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE employees (employee_id INT (11) UNSIGNED NOT NULL,
                                                            first_name VARCHAR(20),
                                                            last_name VARCHAR(25) NOT NULL,
                                                            email VARCHAR(25) NOT NULL,
                                                            phone_number VARCHAR(20),
                                                            hire_date DATE NOT NULL,
                                                            job_id VARCHAR(10) NOT NULL,
                                                            salary DECIMAL(8, 2) NOT NULL,
                                                            commission_pct DECIMAL(2, 2),
                                                            manager_id INT (11) UNSIGNED,
                                                            department_id INT (11) UNSIGNED,
                                                            PRIMARY KEY (employee_id)
                                                            );`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

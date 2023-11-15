import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterForignkey1700044095580 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE countries ADD FOREIGN KEY (region_id) REFERENCES regions(region_id);`);
		await queryRunner.query(`ALTER TABLE locations ADD FOREIGN KEY (country_id) REFERENCES countries(country_id);`);
		await queryRunner.query(`ALTER TABLE departments ADD FOREIGN KEY (location_id) REFERENCES locations(location_id);`);
		await queryRunner.query(`ALTER TABLE employees ADD FOREIGN KEY (job_id) REFERENCES jobs(job_id);`);
		await queryRunner.query(`ALTER TABLE employees ADD FOREIGN KEY (department_id) REFERENCES departments(department_id);`);
		await queryRunner.query(`ALTER TABLE employees ADD FOREIGN KEY (manager_id) REFERENCES employees(employee_id);`);
		await queryRunner.query(`ALTER TABLE departments ADD FOREIGN KEY (manager_id) REFERENCES employees (employee_id);`);
		await queryRunner.query(`ALTER TABLE job_history ADD FOREIGN KEY (employee_id) REFERENCES employees(employee_id);`);
		await queryRunner.query(`ALTER TABLE job_history ADD FOREIGN KEY (job_id) REFERENCES jobs(job_id);`);
		await queryRunner.query(`ALTER TABLE job_history ADD FOREIGN KEY (department_id) REFERENCES departments(department_id);`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

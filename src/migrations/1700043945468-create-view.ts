import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateView1700043945468 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE VIEW emp_details_view
                                AS
                                SELECT e.employee_id,
                                e.job_id,
                                e.manager_id,
                                e.department_id,
                                d.location_id,
                                l.country_id,
                                e.first_name,
                                e.last_name,
                                e.salary,
                                e.commission_pct,
                                d.department_name,
                                j.job_title,
                                l.city,
                                l.state_province,
                                c.country_name,
                                r.region_name
                                FROM employees e,
                                departments d,
                                jobs j,
                                locations l,
                                countries c,
                                regions r
                                WHERE e.department_id = d.department_id
                                AND d.location_id = l.location_id
                                AND l.country_id = c.country_id
                                AND c.region_id = r.region_id
                                AND j.job_id = e.job_id;
		`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

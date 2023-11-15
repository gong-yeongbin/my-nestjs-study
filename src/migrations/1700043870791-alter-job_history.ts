import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterJobHistory1700043870791 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE job_history ADD UNIQUE INDEX (
                                                                                employee_id,
                                                                                start_date
                                                                                );`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async down(queryRunner: QueryRunner): Promise<void> {}
}

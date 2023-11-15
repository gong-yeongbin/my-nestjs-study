import { Column, Entity, OneToMany } from 'typeorm';
import { EmployeesEntity } from './employees.entity';
import { JobHistoryEntity } from './jobHistory.entity';

@Entity('jobs', { schema: 'echonrich' })
export class JobsEntity {
	@Column('varchar', { primary: true, name: 'job_id', length: 10 })
	jobId: string;

	@Column('varchar', { name: 'job_title', length: 35 })
	jobTitle: string;

	@Column('decimal', {
		name: 'min_salary',
		nullable: true,
		unsigned: true,
		precision: 8,
		scale: 0,
	})
	minSalary: string | null;

	@Column('decimal', {
		name: 'max_salary',
		nullable: true,
		unsigned: true,
		precision: 8,
		scale: 0,
	})
	maxSalary: string | null;

	@OneToMany(() => EmployeesEntity, (employees) => employees.job)
	employees: EmployeesEntity[];

	@OneToMany(() => JobHistoryEntity, (jobHistory) => jobHistory.job)
	jobHistories: JobHistoryEntity[];
}

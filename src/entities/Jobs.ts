import { Column, Entity, OneToMany } from 'typeorm';
import { Employees } from './Employees';
import { JobHistory } from './JobHistory';

@Entity('jobs', { schema: 'echonrich' })
export class Jobs {
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

	@OneToMany(() => Employees, (employees) => employees.job)
	employees: Employees[];

	@OneToMany(() => JobHistory, (jobHistory) => jobHistory.job)
	jobHistories: JobHistory[];
}

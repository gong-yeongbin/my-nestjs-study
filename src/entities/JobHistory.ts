import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Employees } from './Employees';
import { Jobs } from './Jobs';
import { Departments } from './Departments';

@Index('department_id', ['departmentId'], {})
@Index('employee_id', ['employeeId', 'startDate'], { unique: true })
@Index('job_id', ['jobId'], {})
@Entity('job_history', { schema: 'echonrich' })
export class JobHistory {
	@Column('int', { name: 'employee_id', unsigned: true })
	employeeId: number;

	@Column('date', { name: 'start_date' })
	startDate: string;

	@Column('date', { name: 'end_date' })
	endDate: string;

	@Column('varchar', { name: 'job_id', length: 10 })
	jobId: string;

	@Column('int', { name: 'department_id', unsigned: true })
	departmentId: number;

	@ManyToOne(() => Employees, (employees) => employees.jobHistories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'employeeId' }])
	employee: Employees;

	@ManyToOne(() => Jobs, (jobs) => jobs.jobHistories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'job_id', referencedColumnName: 'jobId' }])
	job: Jobs;

	@ManyToOne(() => Departments, (departments) => departments.jobHistories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
	department: Departments;
}

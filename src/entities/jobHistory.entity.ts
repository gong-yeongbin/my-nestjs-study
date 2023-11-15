import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { EmployeesEntity } from './employees.entity';
import { JobsEntity } from './jobs.entity';
import { DepartmentsEntity } from './departments.entity';

@Index('department_id', ['departmentId'], {})
@Index('employee_id', ['employeeId', 'startDate'], { unique: true })
@Index('job_id', ['jobId'], {})
@Entity('job_history', { schema: 'echonrich' })
export class JobHistoryEntity {
	@Column('int', { primary: true, name: 'employee_id', unsigned: true })
	employeeId: number;

	@Column('date', { name: 'start_date' })
	startDate: string;

	@Column('date', { name: 'end_date' })
	endDate: string;

	@Column('varchar', { name: 'job_id', length: 10 })
	jobId: string;

	@Column('int', { name: 'department_id', unsigned: true })
	departmentId: number;

	@ManyToOne(() => EmployeesEntity, (employees) => employees.jobHistories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'employee_id', referencedColumnName: 'employeeId' }])
	employee: EmployeesEntity;

	@ManyToOne(() => JobsEntity, (jobs) => jobs.jobHistories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'job_id', referencedColumnName: 'jobId' }])
	job: JobsEntity;

	@ManyToOne(() => DepartmentsEntity, (departments) => departments.jobHistories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
	department: DepartmentsEntity;
}

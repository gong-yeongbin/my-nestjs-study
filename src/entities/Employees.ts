import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Departments } from './Departments';
import { Jobs } from './Jobs';
import { JobHistory } from './JobHistory';

@Index('department_id', ['departmentId'], {})
@Index('job_id', ['jobId'], {})
@Index('manager_id', ['managerId'], {})
@Entity('employees', { schema: 'echonrich' })
export class Employees {
	@Column('int', { primary: true, name: 'employee_id', unsigned: true })
	employeeId: number;

	@Column('varchar', { name: 'first_name', nullable: true, length: 20 })
	firstName: string | null;

	@Column('varchar', { name: 'last_name', length: 25 })
	lastName: string;

	@Column('varchar', { name: 'email', length: 25 })
	email: string;

	@Column('varchar', { name: 'phone_number', nullable: true, length: 20 })
	phoneNumber: string | null;

	@Column('date', { name: 'hire_date' })
	hireDate: string;

	@Column('varchar', { name: 'job_id', length: 10 })
	jobId: string;

	@Column('decimal', { name: 'salary', precision: 8, scale: 2 })
	salary: string;

	@Column('decimal', {
		name: 'commission_pct',
		nullable: true,
		precision: 2,
		scale: 2,
	})
	commissionPct: string | null;

	@Column('int', { name: 'manager_id', nullable: true, unsigned: true })
	managerId: number | null;

	@Column('int', { name: 'department_id', nullable: true, unsigned: true })
	departmentId: number | null;

	@OneToMany(() => Departments, (departments) => departments.manager)
	departments: Departments[];

	@ManyToOne(() => Jobs, (jobs) => jobs.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'job_id', referencedColumnName: 'jobId' }])
	job: Jobs;

	@ManyToOne(() => Departments, (departments) => departments.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
	department: Departments;

	@ManyToOne(() => Employees, (employees) => employees.employees, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'manager_id', referencedColumnName: 'employeeId' }])
	manager: Employees;

	@OneToMany(() => Employees, (employees) => employees.manager)
	employees: Employees[];

	@OneToMany(() => JobHistory, (jobHistory) => jobHistory.employee)
	jobHistories: JobHistory[];
}

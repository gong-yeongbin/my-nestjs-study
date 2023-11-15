import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Locations } from './Locations';
import { Employees } from './Employees';
import { JobHistory } from './JobHistory';

@Index('location_id', ['locationId'], {})
@Index('manager_id', ['managerId'], {})
@Entity('departments', { schema: 'echonrich' })
export class Departments {
	@Column('int', { primary: true, name: 'department_id', unsigned: true })
	departmentId: number;

	@Column('varchar', { name: 'department_name', length: 30 })
	departmentName: string;

	@Column('int', { name: 'manager_id', nullable: true, unsigned: true })
	managerId: number | null;

	@Column('int', { name: 'location_id', nullable: true, unsigned: true })
	locationId: number | null;

	@ManyToOne(() => Locations, (locations) => locations.departments, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'location_id', referencedColumnName: 'locationId' }])
	location: Locations;

	@ManyToOne(() => Employees, (employees) => employees.departments, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'manager_id', referencedColumnName: 'employeeId' }])
	manager: Employees;

	@OneToMany(() => Employees, (employees) => employees.department)
	employees: Employees[];

	@OneToMany(() => JobHistory, (jobHistory) => jobHistory.department)
	jobHistories: JobHistory[];
}

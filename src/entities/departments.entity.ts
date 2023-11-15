import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LocationsEntity } from './locations.entity';
import { EmployeesEntity } from './employees.entity';
import { JobHistoryEntity } from './jobHistory.entity';

@Index('location_id', ['locationId'], {})
@Index('manager_id', ['managerId'], {})
@Entity('departments', { schema: 'echonrich' })
export class DepartmentsEntity {
	@Column('int', { primary: true, name: 'department_id', unsigned: true })
	departmentId: number;

	@Column('varchar', { name: 'department_name', length: 30 })
	departmentName: string;

	@Column('int', { name: 'manager_id', nullable: true, unsigned: true })
	managerId: number | null;

	@Column('int', { name: 'location_id', nullable: true, unsigned: true })
	locationId: number | null;

	@ManyToOne(() => LocationsEntity, (locations) => locations.departments, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'location_id', referencedColumnName: 'locationId' }])
	location: LocationsEntity;

	@ManyToOne(() => EmployeesEntity, (employees) => employees.departments, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'manager_id', referencedColumnName: 'employeeId' }])
	manager: EmployeesEntity;

	@OneToMany(() => EmployeesEntity, (employees) => employees.department)
	employees: EmployeesEntity[];

	@OneToMany(() => JobHistoryEntity, (jobHistory) => jobHistory.department)
	jobHistories: JobHistoryEntity[];
}

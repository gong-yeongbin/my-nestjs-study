import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EmployeesEntity } from '../entities/employees.entity';
import { IEmployee } from './employee.interface';

@Injectable()
export class EmployeeRepository extends Repository<EmployeesEntity> implements IEmployee {
	constructor(private dataSource: DataSource) {
		super(EmployeesEntity, dataSource.createEntityManager());
	}

	async getEmployee(employee_id: number): Promise<EmployeesEntity> | null {
		try {
			return await this.findOne({ where: { employeeId: employee_id } });
		} catch (e) {
			console.log(e);
		}
	}

	async getEmployeeDetail(employee_id: number): Promise<EmployeesEntity> {
		try {
			return await this.findOne({ where: { employeeId: employee_id }, relations: ['job', 'department', 'manager'] });
		} catch (e) {
			console.log(e);
		}
	}
}

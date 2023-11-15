import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployee } from './employee.interface';
import { EmployeesEntity } from '../entities/employees.entity';

@Injectable()
export class EmployeeService {
	constructor(@Inject('EmployeeRepository') private readonly employeeRepository: IEmployee) {}

	async getEmployee(employee_id: number) {
		const employeeEntity: EmployeesEntity | null = await this.employeeRepository.getEmployee(employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}

	async getEmployeeDetail(employee_id: number) {
		const employeeEntity: EmployeesEntity | null = await this.employeeRepository.getEmployeeDetail(employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployee } from './employee.interface';
import { EmployeesEntity } from '../entities/employees.entity';

@Injectable()
export class EmployeeService {
	constructor(@Inject('EmployeeRepository') private readonly employeeRepository: IEmployee) {}

	async findEmployee(employee_id: number) {
		const employeeEntity: EmployeesEntity | null = await this.employeeRepository.findEmployee(employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}

	async findEmployeeDetail(employee_id: number) {
		const employeeEntity: EmployeesEntity | null = await this.employeeRepository.findEmployeeDetail(employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}
}

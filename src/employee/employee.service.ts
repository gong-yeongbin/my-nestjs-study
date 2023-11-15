import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployee } from './employee.interface';
import { EmployeesEntity } from '../entities/employees.entity';
import { EmployeeFindDto } from './dto/employee-find.dto';

@Injectable()
export class EmployeeService {
	constructor(@Inject('EmployeeRepository') private readonly employeeRepository: IEmployee) {}

	async getEmployee(employeeFindDto: EmployeeFindDto) {
		const employeeEntity: EmployeesEntity | null = await this.employeeRepository.getEmployee(employeeFindDto.employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}

	async getEmployeeDetail(employeeFindDto: EmployeeFindDto) {
		const employeeEntity: EmployeesEntity | null = await this.employeeRepository.getEmployeeDetail(employeeFindDto.employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}
}

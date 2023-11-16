import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IEmployee } from './employee.interface';
import { EmployeesEntity } from '../entities/employees.entity';
import { IDepartment } from '../department/department.interface';
import { DepartmentsEntity } from '../entities/departments.entity';
import { EmployeeSalaryUpdateDto } from './dto/employee-salary-update.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';

@Injectable()
export class EmployeeService {
	constructor(
		@Inject('EmployeeRepository') private readonly employeeRepository: IEmployee,
		@Inject('DepartmentRepository') private readonly departmentRepository: IDepartment
	) {}

	async findEmployee(employee_id: number) {
		const employeeEntity: EmployeesEntity = await this.employeeRepository.findEmployee(employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}

	async findEmployeeDetail(employee_id: number) {
		const employeeEntity: EmployeesEntity = await this.employeeRepository.findEmployeeDetail(employee_id);

		if (!employeeEntity) throw new NotFoundException();

		return employeeEntity;
	}

	async updateSalaryByDepartment(employeeSalaryUpdateDto: EmployeeSalaryUpdateDto) {
		const departmentEntity: DepartmentsEntity = await this.departmentRepository.findDepartment(employeeSalaryUpdateDto.department_id);
		const employeeEntity: EmployeesEntity[] = await this.employeeRepository.findEmployeeByDepartment(employeeSalaryUpdateDto.department_id);

		if (!departmentEntity || employeeEntity.length < 0) throw new NotFoundException();

		employeeEntity.forEach((employee) => {
			const salary: number = parseInt(employee.salary);
			const increaseSalary: number = salary + (salary / 100) * employeeSalaryUpdateDto.increase;
			employee.salary = increaseSalary.toString();
		});

		await this.employeeRepository.saveEmployeeList(employeeEntity);
	}

	async updateEmployee(employeeUpdateDto: EmployeeUpdateDto) {
		const employeeEntity: EmployeesEntity = await this.employeeRepository.findEmployee(employeeUpdateDto.employee_id);

		if (!employeeEntity) throw new NotFoundException();

		employeeEntity.firstName = employeeUpdateDto.first_name;
		employeeEntity.lastName = employeeUpdateDto.last_name;
		employeeEntity.email = employeeUpdateDto.email;
		employeeEntity.phoneNumber = employeeUpdateDto.phone_number;
		employeeEntity.hireDate = employeeUpdateDto.hire_date;
		employeeEntity.jobId = employeeUpdateDto.job_id;
		employeeEntity.salary = employeeUpdateDto.salary;
		employeeEntity.commissionPct = employeeUpdateDto.commission_pct;
		employeeEntity.managerId = employeeUpdateDto.manager_id;
		employeeEntity.departmentId = employeeUpdateDto.department_id;

		await this.employeeRepository.saveEmployee(employeeEntity);
	}
}

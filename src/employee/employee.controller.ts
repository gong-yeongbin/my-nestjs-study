import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeSalaryUpdateDto } from './dto/employee-salary-update.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';

@Controller('employee')
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Post()
	async updateEmployee(@Body() employeeUpdateDto: EmployeeUpdateDto) {
		await this.employeeService.updateEmployee(employeeUpdateDto);
	}

	@Post('/salary')
	async updateSalaryByDepartment(@Body() employeeSalaryUpdateDto: EmployeeSalaryUpdateDto) {
		await this.employeeService.updateSalaryByDepartment(employeeSalaryUpdateDto);
	}

	@Get(':employee_id')
	async findEmployee(@Param('employee_id') employee_id: number) {
		return await this.employeeService.findEmployee(employee_id);
	}

	@Get('detail/:employee_id')
	async findEmployeeDetail(@Param('employee_id') employee_id: number) {
		return await this.employeeService.findEmployeeDetail(employee_id);
	}
}

import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeFindDto } from './dto/employee-find.dto';

@Controller('employee')
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Get(':employee_id')
	async getEmployee(@Param('employee_id') employeeFindDto: EmployeeFindDto) {
		return await this.employeeService.getEmployee(employeeFindDto);
	}

	@Get('detail/:employee_id')
	async getEmployeeDetail(@Param('employee_id') employeeFindDto: EmployeeFindDto) {
		return await this.employeeService.getEmployeeDetail(employeeFindDto);
	}
}

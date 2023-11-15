import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Get(':employee_id')
	async getEmployee(@Param('employee_id') employee_id: number) {
		return await this.employeeService.getEmployee(employee_id);
	}

	@Get('detail/:employee_id')
	async getEmployeeDetail(@Param('employee_id') employee_id: number) {
		return await this.employeeService.getEmployeeDetail(employee_id);
	}
}

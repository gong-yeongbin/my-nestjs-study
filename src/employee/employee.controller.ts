import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeSalaryUpdateDto } from './dto/employee-salary-update.dto';
import { EmployeeUpdateDto } from './dto/employee-update.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('employee')
export class EmployeeController {
	constructor(private readonly employeeService: EmployeeService) {}

	@Patch()
	@ApiOperation({ summary: '사원 정보 업데이트' })
	async updateEmployee(@Body() employeeUpdateDto: EmployeeUpdateDto) {
		await this.employeeService.updateEmployee(employeeUpdateDto);
	}

	@Post('/salary')
	@ApiOperation({ summary: '부서별 사원 급여 인상' })
	async updateSalaryByDepartment(@Body() employeeSalaryUpdateDto: EmployeeSalaryUpdateDto) {
		await this.employeeService.updateSalaryByDepartment(employeeSalaryUpdateDto);
	}

	@Get(':employee_id')
	@ApiOperation({ summary: '특정 사원 현재 정보' })
	async findEmployee(@Param('employee_id') employee_id: number) {
		return await this.employeeService.findEmployee(employee_id);
	}

	@Get('detail/:employee_id')
	@ApiOperation({ summary: '특정 사원 이력 정보 조회' })
	async findEmployeeDetail(@Param('employee_id') employee_id: number) {
		return await this.employeeService.findEmployeeDetail(employee_id);
	}
}

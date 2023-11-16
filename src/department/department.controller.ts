import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('department')
export class DepartmentController {
	constructor(private readonly departmentService: DepartmentService) {}

	@Get(':department_id')
	@ApiOperation({ summary: '부서 및 위치 조회' })
	async findDepartmentAndLocation(@Param('department_id') department_id: number) {
		return await this.departmentService.findDepartmentAndLocation(department_id);
	}
}

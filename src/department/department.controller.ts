import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
	constructor(private readonly departmentService: DepartmentService) {}

	@Get(':department_id')
	async findDepartmentAndLocation(@Param('department_id') department_id: number) {
		return await this.departmentService.findDepartmentAndLocation(department_id);
	}
}

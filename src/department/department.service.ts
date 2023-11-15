import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDepartment } from './department.interface';
import { DepartmentsEntity } from '../entities/departments.entity';

@Injectable()
export class DepartmentService {
	constructor(@Inject('DepartmentRepository') private readonly departmentRepository: IDepartment) {}

	async findDepartmentAndLocation(department_id: number) {
		const departmentEntity: DepartmentsEntity | null = await this.departmentRepository.findDepartmentAndLocation(department_id);

		if (!departmentEntity) throw new NotFoundException();

		return departmentEntity;
	}
}

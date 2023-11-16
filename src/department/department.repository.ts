import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DepartmentsEntity } from '../entities/departments.entity';
import { IDepartment } from './department.interface';

@Injectable()
export class DepartmentRepository extends Repository<DepartmentsEntity> implements IDepartment {
	constructor(private dataSource: DataSource) {
		super(DepartmentsEntity, dataSource.createEntityManager());
	}

	async findDepartment(department_id: number) {
		try {
			return this.findOne({ where: { departmentId: department_id } });
		} catch (e) {
			console.log(e);
		}
	}

	async findDepartmentAndLocation(department_id: number): Promise<DepartmentsEntity> {
		try {
			return await this.findOne({ where: { departmentId: department_id }, relations: ['location'] });
		} catch (e) {
			console.log(e);
		}
	}
}

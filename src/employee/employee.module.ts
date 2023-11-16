import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesEntity } from '../entities/employees.entity';
import { DepartmentRepository } from '../department/department.repository';

@Module({
	imports: [TypeOrmModule.forFeature([EmployeesEntity])],
	providers: [
		EmployeeService,
		{ provide: 'EmployeeRepository', useClass: EmployeeRepository },
		{ provide: 'DepartmentRepository', useClass: DepartmentRepository },
	],
	controllers: [EmployeeController],
})
export class EmployeeModule {}

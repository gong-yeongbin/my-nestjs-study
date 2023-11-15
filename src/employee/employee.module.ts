import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesEntity } from '../entities/employees.entity';

@Module({
	imports: [TypeOrmModule.forFeature([EmployeesEntity])],
	providers: [EmployeeService, { provide: 'EmployeeRepository', useClass: EmployeeRepository }],
	controllers: [EmployeeController],
})
export class EmployeeModule {}

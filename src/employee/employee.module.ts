import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepositoryService } from './employee.repository.service';

@Module({
	providers: [EmployeeService, EmployeeRepositoryService],
	controllers: [EmployeeController],
})
export class EmployeeModule {}

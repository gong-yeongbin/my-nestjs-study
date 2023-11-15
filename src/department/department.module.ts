import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
	providers: [DepartmentService],
	controllers: [DepartmentController],
})
export class DepartmentModule {}

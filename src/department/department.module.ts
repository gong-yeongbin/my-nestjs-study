import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsEntity } from '../entities/departments.entity';
import { DepartmentRepository } from './department.repository';

@Module({
	imports: [TypeOrmModule.forFeature([DepartmentsEntity])],
	providers: [DepartmentService, { provide: 'DepartmentRepository', useClass: DepartmentRepository }],
	controllers: [DepartmentController],
})
export class DepartmentModule {}

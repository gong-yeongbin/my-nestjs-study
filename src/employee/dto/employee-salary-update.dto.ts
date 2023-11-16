import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeSalaryUpdateDto {
	@ApiProperty({ description: '부서번호' })
	@IsNumber()
	department_id: number;

	@ApiProperty({ description: '급여 증가 비율' })
	@IsNumber()
	increase: number;
}

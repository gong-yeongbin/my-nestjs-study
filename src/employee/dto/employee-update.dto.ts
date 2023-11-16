import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeUpdateDto {
	@ApiProperty({ description: '사원 번호' })
	@IsNumber()
	employee_id: number;

	@ApiProperty({ description: '이름' })
	@IsString()
	first_name: string;

	@ApiProperty({ description: '성' })
	@IsString()
	last_name: string;

	@ApiProperty({ description: '이메일' })
	@IsString()
	email: string;

	@ApiProperty({ description: '핸드폰번호' })
	@IsString()
	phone_number: string;

	@ApiProperty({ description: '입사일' })
	@IsString()
	hire_date: string;

	@ApiProperty({ description: '담당업무번호' })
	@IsString()
	job_id: string;

	@ApiProperty({ description: '급여' })
	@IsString()
	salary: string;

	@IsString()
	@IsOptional()
	commission_pct: string | null;

	@ApiProperty({ description: '매니저번호' })
	@IsNumber()
	manager_id: number;

	@ApiProperty({ description: '부서번호' })
	@IsNumber()
	department_id: number;
}

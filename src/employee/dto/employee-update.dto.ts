import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EmployeeUpdateDto {
	@IsNumber()
	employee_id: number;

	@IsString()
	first_name: string;

	@IsString()
	last_name: string;

	@IsString()
	email: string;

	@IsString()
	phone_number: string;

	@IsString()
	hire_date: string;

	@IsString()
	job_id: string;

	@IsString()
	salary: string;

	@IsString()
	@IsOptional()
	commission_pct: string | null;

	@IsNumber()
	manager_id: number;

	@IsNumber()
	department_id: number;
}

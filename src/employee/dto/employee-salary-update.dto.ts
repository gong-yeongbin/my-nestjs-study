import { IsNumber } from 'class-validator';

export class EmployeeSalaryUpdateDto {
	@IsNumber()
	department_id: number;

	@IsNumber()
	increase: number;
}

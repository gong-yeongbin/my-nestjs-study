import { IsNumber } from 'class-validator';

export class EmployeeFindDto {
	@IsNumber()
	employee_id: number;
}

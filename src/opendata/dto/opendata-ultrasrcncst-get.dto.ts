import { IsNumber, IsString } from 'class-validator';

export class OpendataUltrasrcncstGetDto {
	@IsNumber()
	page_no: number;

	@IsNumber()
	num_of_rows: number;

	@IsString()
	base_date: string;

	@IsString()
	base_time: string;

	@IsNumber()
	nx: number;

	@IsNumber()
	ny: number;
}

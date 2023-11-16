import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpendataUltrasrcncstGetDto {
	@ApiProperty({ description: '페이지번호' })
	@IsNumber()
	page_no: number;

	@ApiProperty({ description: '한 페이지 결과 수' })
	@IsNumber()
	num_of_rows: number;

	@ApiProperty({ description: '날짜 YYYYMMDD' })
	@IsString()
	base_date: string;

	@ApiProperty({ description: '시간 HHmm' })
	@IsString()
	base_time: string;

	@ApiProperty({ description: '예보지접 x 좌표' })
	@IsNumber()
	nx: number;

	@ApiProperty({ description: '예보지접 y 좌표' })
	@IsNumber()
	ny: number;
}

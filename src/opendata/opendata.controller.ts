import { Controller, Get, Query } from '@nestjs/common';
import { OpendataService } from './opendata.service';

@Controller('opendata')
export class OpendataController {
	constructor(private readonly openDataService: OpendataService) {}

	@Get('getUltraSrtNcst')
	async getUltraSrtNcst(@Query() ultrasrtncstGetDto: { page_no: number; num_of_rows: number; base_date: string; base_time: string; nx: number; ny: number }) {
		return await this.openDataService.getUltraSrtNcst(ultrasrtncstGetDto);
	}
}

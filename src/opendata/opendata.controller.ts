import { Controller, Get, Query } from '@nestjs/common';
import { OpendataService } from './opendata.service';
import { OpendataUltrasrcncstGetDto } from './dto/opendata-ultrasrcncst-get.dto';

@Controller('opendata')
export class OpendataController {
	constructor(private readonly openDataService: OpendataService) {}

	@Get('getUltraSrtNcst')
	async getUltraSrtNcst(@Query() opendataUltrasrcncstGetDto: OpendataUltrasrcncstGetDto) {
		return await this.openDataService.getUltraSrtNcst(opendataUltrasrcncstGetDto);
	}
}

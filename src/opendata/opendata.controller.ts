import { Controller, Get, Query } from '@nestjs/common';
import { OpendataService } from './opendata.service';
import { OpendataUltrasrcncstGetDto } from './dto/opendata-ultrasrcncst-get.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('opendata')
export class OpendataController {
	constructor(private readonly openDataService: OpendataService) {}

	@Get('getUltraSrtNcst')
	@ApiOperation({ summary: '기상청 단기 예보 조회(초단기 실황 조회)' })
	async getUltraSrtNcst(@Query() opendataUltrasrcncstGetDto: OpendataUltrasrcncstGetDto) {
		return await this.openDataService.getUltraSrtNcst(opendataUltrasrcncstGetDto);
	}
}

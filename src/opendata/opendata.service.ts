import { Inject, Injectable } from '@nestjs/common';
import { IOpendata } from './opendata.interface';
import { OpendataUltrasrcncstGetDto } from './dto/opendata-ultrasrcncst-get.dto';

@Injectable()
export class OpendataService {
	constructor(@Inject('OpenDataRepository') private readonly openDataRepository: IOpendata) {}

	async getUltraSrtNcst(opendataUltrasrcncstGetDto: OpendataUltrasrcncstGetDto) {
		const opendataUltrasrcncstGetEntity = {
			page_no: opendataUltrasrcncstGetDto.page_no,
			num_of_rows: opendataUltrasrcncstGetDto.num_of_rows,
			base_date: opendataUltrasrcncstGetDto.base_date,
			base_time: opendataUltrasrcncstGetDto.base_time,
			nx: opendataUltrasrcncstGetDto.nx,
			ny: opendataUltrasrcncstGetDto.ny,
		};
		const startTime = new Date().getTime();

		const resultOpenData = await this.openDataRepository.getUltraSrtNcst(opendataUltrasrcncstGetEntity);

		const elapsedTime = new Date().getTime() - startTime;

		if (elapsedTime > 2000) console.warn('공공데이터 타임아웃 2000ms 이상');

		return resultOpenData;
	}
}

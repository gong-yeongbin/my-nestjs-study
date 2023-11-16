import { Inject, Injectable } from '@nestjs/common';
import { IOpendata } from './opendata.interface';

@Injectable()
export class OpendataService {
	constructor(@Inject('OpenDataRepository') private readonly openDataRepository: IOpendata) {}

	async getUltraSrtNcst(ultrasrtncstGetDto: { page_no: number; num_of_rows: number; base_date: string; base_time: string; nx: number; ny: number }) {
		const startTime = new Date().getTime();

		const resultOpenData = await this.openDataRepository.getUltraSrtNcst(ultrasrtncstGetDto);

		const elapsedTime = new Date().getTime() - startTime;

		if (elapsedTime > 2000) console.warn('공공데이터 타임아웃 2000ms 이상');

		return resultOpenData;
	}
}

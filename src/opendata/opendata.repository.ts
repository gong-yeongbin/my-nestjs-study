import { Injectable } from '@nestjs/common';
import { IOpendata } from './opendata.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class OpendataRepository implements IOpendata {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {}

	async getUltraSrtNcst(ultrasrtncstGetDto: { page_no: number; num_of_rows: number; base_date: string; base_time: string; nx: number; ny: number }) {
		const url: string = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?dataType=JSON&ServiceKey=${this.configService.get<string>(
			'OPEN_DATA_SERVICE_KEY'
		)}&pageNo=${ultrasrtncstGetDto.page_no}&numOfRows=${ultrasrtncstGetDto.num_of_rows}&base_date=${ultrasrtncstGetDto.base_date}&base_time=${
			ultrasrtncstGetDto.base_time
		}&nx=${ultrasrtncstGetDto.nx}&ny=${ultrasrtncstGetDto.ny}`;

		try {
			return await this.httpService.get(url).pipe(map((response) => response.data));
		} catch (e) {
			console.log(e);
		}
	}
}

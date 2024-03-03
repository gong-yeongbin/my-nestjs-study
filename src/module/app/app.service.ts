import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor() {}
	getHello() {
		return 'hello world!!!';
	}
}

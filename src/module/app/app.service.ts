import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor(private readonly logger: Logger) {}
	getHello() {
		this.logger.log('logger test', AppService.name);
		return 'hello world!!!';
	}
}

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}
	createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
		return {
			type: 'mysql',
			host: this.configService.get<string>('MYSQL_HOST'),
			port: this.configService.get<number>('MYSQL_PORT'),
			username: this.configService.get<string>('MYSQL_USER'),
			password: this.configService.get<string>('MYSQL_PASSWORD'),
			database: this.configService.get<string>('MYSQL_DATABASE'),
			entities: [__dirname + '/../entities/*.entity.{js,ts}'],
			synchronize: false,
		};
	}
}

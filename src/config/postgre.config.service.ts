import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgreConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}
	createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.configService.get<string>('POSTGRES_HOST'),
			port: this.configService.get<number>('POSTGRES_PORT'),
			username: this.configService.get<string>('POSTGRES_USER'),
			password: this.configService.get<string>('POSTGRES_PASSWORD'),
			database: this.configService.get<string>('POSTGRES_DATABASE'),
			entities: [__dirname + '/../entities/*.entity.{js,ts}'],
			synchronize: false,
		};
	}
}

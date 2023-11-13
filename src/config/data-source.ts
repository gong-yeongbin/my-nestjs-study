import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

const configService = new ConfigService();

export const dataSource = new DataSource({
	type: 'mysql',
	host: configService.get<string>('MYSQL_HOST'),
	port: configService.get<number>('MYSQL_PORT'),
	username: configService.get<string>('MYSQL_USER'),
	password: configService.get<string>('MYSQL_PASSWORD'),
	database: configService.get<string>('MYSQL_DATABASE'),
	migrations: [__dirname + '/../migrations/*.{js,ts}'],
	synchronize: false,
});

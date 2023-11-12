import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

const configService = new ConfigService();

export const dataSource = new DataSource({
	type: 'postgres',
	host: configService.get<string>('POSTGRES_HOST'),
	port: configService.get<number>('POSTGRES_PORT'),
	username: configService.get<string>('POSTGRES_USER'),
	password: configService.get<string>('POSTGRES_PASSWORD'),
	database: configService.get<string>('POSTGRES_DATABASE'),
	migrations: [__dirname + '/../migrations/*.{js,ts}'],
	synchronize: false,
});

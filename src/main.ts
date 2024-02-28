import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/config/logger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: logger });

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		})
	);

	const configService = app.get(ConfigService);
	const port: number = configService.get<number>('PORT', 3000);
	await app.listen(port);
}
bootstrap();

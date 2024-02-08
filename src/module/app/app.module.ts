import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, cache: true }),
		// JwtModule.register({ global: true, secret: process.env.JWT_CONSTANTS, signOptions: { expiresIn: '60s' } }),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}

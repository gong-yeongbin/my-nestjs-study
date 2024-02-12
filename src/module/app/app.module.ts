import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), AuthModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}

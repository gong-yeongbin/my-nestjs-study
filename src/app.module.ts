import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostgreConfigService } from './config/postgre.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), TypeOrmModule.forRootAsync({ useClass: PostgreConfigService })],
	controllers: [AppController],
	providers: [AppService, PostgreConfigService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MysqlConfigService } from './config/mysql.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), TypeOrmModule.forRootAsync({ useClass: MysqlConfigService })],
	controllers: [AppController],
	providers: [AppService, MysqlConfigService],
})
export class AppModule {}

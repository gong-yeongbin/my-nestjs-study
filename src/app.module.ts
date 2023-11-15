import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MysqlConfigService } from './config/mysql.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), TypeOrmModule.forRootAsync({ useClass: MysqlConfigService }), EmployeeModule],
	controllers: [AppController],
	providers: [AppService, MysqlConfigService],
})
export class AppModule {}

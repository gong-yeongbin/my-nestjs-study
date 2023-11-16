import { Module } from '@nestjs/common';
import { OpendataController } from './opendata.controller';
import { OpendataService } from './opendata.service';
import { HttpModule } from '@nestjs/axios';
import { OpendataRepository } from './opendata.repository';

@Module({
	imports: [HttpModule],
	controllers: [OpendataController],
	providers: [OpendataService, { provide: 'OpenDataRepository', useClass: OpendataRepository }],
})
export class OpendataModule {}

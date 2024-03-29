import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';
import { JwtRefreshStrategy } from '../../common/strategy/jwt-refresh.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), AuthModule, UserModule, JwtModule.register({}), PrismaModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule {}

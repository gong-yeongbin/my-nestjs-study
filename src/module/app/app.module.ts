import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';
import { JwtRefreshStrategy } from '../../common/strategy/jwt-refresh.strategy';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), AuthModule, UserModule, JwtModule.register({})],
	controllers: [AppController],
	providers: [AppService, AuthService, PrismaService, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [UserModule, PassportModule],
	providers: [AuthService, LocalStrategy, JwtService],
	exports: [AuthService],
})
export class AuthModule {}

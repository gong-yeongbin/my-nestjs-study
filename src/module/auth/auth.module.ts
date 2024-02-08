import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [UserModule, PassportModule, JwtModule.register({ secret: process.env.JWT_ACCESS_SECRET, signOptions: { expiresIn: '60s' } })],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

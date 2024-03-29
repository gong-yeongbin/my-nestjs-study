import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access') {
	constructor(private readonly configService: ConfigService) {
		super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: configService.get('JWT_ACCESS_SECRET') });
	}

	validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}

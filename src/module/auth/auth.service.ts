import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}
	validateUser(username: string, password: string) {
		const user = this.userService.findOne(username);

		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	login(user: any): { access_token: string; refresh_token: string } {
		const payload = { username: user.username, sub: user.userId };
		const access_token: string = this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '1h' });
		const refresh_token: string = this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '1d' });

		return { access_token: access_token, refresh_token: refresh_token };
	}

	getAccessToken(user: any): { access_token: string } {
		const payload = { username: user.username, sub: user.userId };
		const access_token: string = this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '1h' });
		return { access_token: access_token };
	}
}

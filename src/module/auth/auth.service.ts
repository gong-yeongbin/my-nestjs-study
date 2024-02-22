import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}
	validateUser(id: string, pass: string) {
		const user = this.userService.findOne(id);

		if (user && bcrypt.compareSync(pass, user.password)) {
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

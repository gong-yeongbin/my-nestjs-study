import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async signIn(name: string, pass: string) {
		const user = await this.userService.findOneByUserName(name);

		if (user.password != pass) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, username: user.name };

		return {
			access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_ACCESS_SECRET'), expiresIn: '1h' }),
			refresh_token: await this.jwtService.signAsync(payload, { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '7d' }),
		};
	}

	async validateUser(username: string, password: string) {
		const user = await this.userService.findOne(username);

		if (user && user.password == password) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}
}

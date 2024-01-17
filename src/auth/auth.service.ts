import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async signIn(name: string, pass: string) {
		const user = await this.userService.findOneByUserName(name);

		if (user.password != pass) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, username: user.name };

		return { access_token: await this.jwtService.signAsync(payload) };
	}
}

import { BadGatewayException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}
	validateUser(username: string, password: string) {
		const user = this.userService.findOne(username);

		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	login(user: any): { access_token: string } {
		const payload = { username: user.username, sub: user.userId };
		const token: string = this.jwtService.sign(payload);

		if (!token) throw new BadGatewayException();

		return { access_token: token };
	}
}

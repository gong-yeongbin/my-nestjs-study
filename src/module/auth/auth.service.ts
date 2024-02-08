import { Injectable } from '@nestjs/common';
import { User, UserService } from '../user/user.service';
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
}

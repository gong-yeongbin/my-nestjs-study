import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: { username: string; password: string }) {
		return await this.authService.signIn(signInDto.username, signInDto.password);
	}
}

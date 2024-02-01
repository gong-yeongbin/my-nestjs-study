import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: { username: string; password: string }) {
		return await this.authService.signIn(signInDto.username, signInDto.password);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Req() req: Request) {
		return req.get('user');
	}
}

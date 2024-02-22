import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LocalAuthGuard } from '../../common/guard/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { JwtAuthRefreshGuard } from '../../common/guard/jwt-auth-refresh.guard';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly authService: AuthService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() request: Request) {
		return this.authService.login(request['user']);
	}

	@UseGuards(JwtAuthRefreshGuard)
	@Get('access_token')
	getAccessToken(@Req() request: Request) {
		return this.authService.getAccessToken(request['user']);
	}
}

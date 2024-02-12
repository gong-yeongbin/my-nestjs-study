import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LocalAuthGuard } from '../../common/guard/local-auth.guard';
import { AuthService } from '../auth/auth.service';

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
}

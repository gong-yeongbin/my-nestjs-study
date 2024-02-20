import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../../user/user.module';

describe('AppController', () => {
	let appController: AppController;
	let authService: AuthService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
			controllers: [AppController],
			providers: [AppService, AuthService, JwtService, ConfigService],
		}).compile();

		appController = app.get<AppController>(AppController);
		authService = app.get<AuthService>(AuthService);
	});

	const httpMock = {} as Request;

	it('login, get token', () => {
		authService.login = jest.fn().mockReturnValue({ access_token: 'mock access token', refresh_token: 'mock refresh token' });
		httpMock['userId'] = 'mockUserId';
		httpMock['username'] = 'mockUserName';

		const result = appController.login(httpMock);
		expect(result).toEqual({ access_token: 'mock access token', refresh_token: 'mock refresh token' });
	});
});

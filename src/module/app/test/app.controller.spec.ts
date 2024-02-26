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
	let appService: AppService;
	let authService: AuthService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
			controllers: [AppController],
			providers: [AppService, AuthService, JwtService, ConfigService],
		}).compile();

		appController = app.get<AppController>(AppController);
		appService = app.get<AppService>(AppService);
		authService = app.get<AuthService>(AuthService);
	});

	it('getHello, appService.getHello 호출 테스트 ', () => {
		jest.spyOn(appService, 'getHello');

		appController.getHello();
		expect(appService.getHello).toBeCalledTimes(1);
	});

	it('getHello, appService.getHello 리턴 데이터 테스트', () => {
		appService.getHello = jest.fn().mockReturnValue('hello world!!!');

		expect(appController.getHello()).toEqual('hello world!!!');
	});

	const httpMock = {} as Request;
	httpMock['user'] = { userId: 'mockUserId', username: 'mockUserName' };

	it('login, authService.login 호출 테스트', () => {
		jest.spyOn(authService, 'login');

		appController.login(httpMock);
		expect(authService.login).toBeCalledTimes(1);
	});

	it('login, get token', () => {
		authService.login = jest.fn().mockReturnValue({ access_token: 'mock access token', refresh_token: 'mock refresh token' });

		const result = appController.login(httpMock);
		expect(result).toEqual({ access_token: 'mock access token', refresh_token: 'mock refresh token' });
	});

	it('getAccessToken, getAccessToken 호출 테스트', () => {
		jest.spyOn(authService, 'getAccessToken');

		appController.getAccessToken(httpMock);
		expect(authService.getAccessToken).toBeCalledTimes(1);
	});

	it('getAccessToken, getAccessToken', () => {
		authService.getAccessToken = jest.fn().mockReturnValue({ access_token: 'mock access token' });

		const result = appController.getAccessToken(httpMock);
		expect(result).toEqual({ access_token: 'mock access token' });
	});
});

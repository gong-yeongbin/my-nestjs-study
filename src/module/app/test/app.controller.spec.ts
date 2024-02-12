import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthService } from '../../auth/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { Request } from 'express';

describe('AppController', () => {
	let appController: AppController;
	let authService: AuthService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [AuthModule],
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appController = app.get<AppController>(AppController);
		authService = app.get<AuthService>(AuthService);
	});

	const httpMock = {} as Request;

	it('login, get token', () => {
		authService.login = jest.fn().mockReturnValue({ access_token: 'string token' });
		httpMock['userId'] = 'mockUserId';
		httpMock['username'] = 'mockUserName';

		const result = appController.login(httpMock);
		expect(result).toEqual({ access_token: 'string token' });
	});
});

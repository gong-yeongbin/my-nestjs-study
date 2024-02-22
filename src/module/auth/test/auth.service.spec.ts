import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../../user/user.module';
import bcrypt from 'bcrypt';

describe('AuthService', () => {
	let authService: AuthService;
	let userService: UserService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
			providers: [AuthService, JwtService, ConfigService],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);
		jwtService = module.get<JwtService>(JwtService);
	});

	const mockUser = { userId: 'mockUserId', password: 'mockUserPassword' };
	const mockUserInfo = { userId: 'mockUserId', username: 'mockUserName', password: 'mockUserPassword' };

	it('validateUser, not found user', async () => {
		userService.findOne = jest.fn().mockReturnValue(undefined);
		const result = await authService.validateUser('mockUserId', 'mockUserPassword');

		expect(result).toBe(null);
	});

	it('validateUser, found user, not match password', async () => {
		userService.findOne = jest.fn().mockReturnValue(mockUserInfo);
		bcrypt.compareSync = jest.fn().mockReturnValue(false);

		const result = await authService.validateUser('mockUserId', 'mockUserPassword');

		expect(bcrypt.compareSync).toBeCalledTimes(1);
		expect(result).toEqual(null);
	});

	it('validateUser, found user, match password', async () => {
		userService.findOne = jest.fn().mockReturnValue(mockUserInfo);
		bcrypt.compareSync = jest.fn().mockReturnValue(true);

		const result = await authService.validateUser('mockUserName', 'mockUserPassword');

		expect(result).toEqual({ userId: 'mockUserId', username: 'mockUserName' });
	});

	it('login, get token', () => {
		jwtService.sign = jest.fn().mockReturnValueOnce('mock access token').mockReturnValueOnce('mock refresh token');

		const result = authService.login(mockUser);
		expect(result).toEqual({ access_token: 'mock access token', refresh_token: 'mock refresh token' });
	});

	it('get access token', () => {
		jwtService.sign = jest.fn().mockReturnValue('mock access token');

		const result = authService.getAccessToken(mockUser);
		expect(result).toEqual({ access_token: 'mock access token' });
	});
});

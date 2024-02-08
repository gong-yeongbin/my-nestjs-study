import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
	let authService: AuthService;
	let userService: UserService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, UserService, JwtService],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('validateUser, not found user', () => {
		userService.findOne = jest.fn().mockReturnValue(undefined);
		expect(authService.validateUser('mockUserName', '123')).toEqual(null);
	});

	it('validateUser, found user, not match password', () => {
		userService.findOne = jest.fn().mockReturnValue({ userId: 1, username: 'mockUserName', password: '123' });
		expect(authService.validateUser('mockUserName', '1234')).toEqual(null);
	});

	it('validateUser, found user, match password', () => {
		userService.findOne = jest.fn().mockReturnValue({ userId: 1, username: 'mockUserName', password: '123' });
		expect(authService.validateUser('mockUserName', '123')).toEqual({ userId: 1, username: 'mockUserName' });
	});
});

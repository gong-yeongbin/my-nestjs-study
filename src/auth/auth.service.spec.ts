import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
	let authService: AuthService;
	let userService: UserService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
			providers: [AuthService, JwtService],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);
		jwtService = module.get<JwtService>(JwtService);
	});

	const mockUser = {
		idx: 1,
		id: 'userId1',
		name: 'john',
		password: '1112',
	};

	it('user password가 틀릴경우 exception', () => {
		userService.findOneByUserName = jest.fn().mockResolvedValue(mockUser);

		expect(async () => await authService.signIn('username', 'password1')).rejects.toThrow(new UnauthorizedException());
	});

	it('return user data에 password 포함될때', async () => {
		userService.findOneByUserName = jest.fn().mockResolvedValue(mockUser);
		authService.signIn = jest.fn().mockResolvedValue({ idx: 1, id: 'userId1', name: 'john', password: '1112' });

		const result = await authService.signIn('john', '1112');

		expect(result).toEqual(mockUser);
	});

	it('user password 제외', async () => {
		userService.findOneByUserName = jest.fn().mockResolvedValue(mockUser);
		jwtService.signAsync = jest.fn().mockResolvedValue('MOCK_TOKEN');

		const result = await authService.signIn('john', '1112');

		expect(jwtService.signAsync).toBeCalledTimes(1);
		expect(result).toEqual({ access_token: 'MOCK_TOKEN' });
	});
});

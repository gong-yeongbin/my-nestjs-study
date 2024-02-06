import { LocalStrategy } from './local.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
	let localStrategy: LocalStrategy;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule, JwtModule, ConfigModule],
			providers: [LocalStrategy, AuthService],
		}).compile();

		localStrategy = module.get<LocalStrategy>(LocalStrategy);
		authService = module.get<AuthService>(AuthService);
	});

	it('validate function defined', () => {
		expect(localStrategy.validate).toBeDefined();
	});

	it('validate function authService.validateUser return null', () => {
		authService.validateUser = jest.fn().mockResolvedValue(null);

		expect(async () => await localStrategy.validate('mockUserName', 'mockPassword')).rejects.toThrow(new UnauthorizedException());
	});

	it('validate function authService.validateUser return user', async () => {
		authService.validateUser = jest.fn().mockResolvedValue({ userId: 'mockUserId', username: 'mockUserName' });

		const result = await localStrategy.validate('mockUserName', 'mockPassword');

		expect(result).toEqual({ userId: 'mockUserId', username: 'mockUserName' });
	});
});

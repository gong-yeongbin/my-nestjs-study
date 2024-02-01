import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard unit test', () => {
	const configService = new ConfigService();
	const jwtService = new JwtService();
	const authGuard = new AuthGuard(configService, jwtService);

	it('extractTokenFromHeader unit test return undefied', () => {
		const mockRequest = { headers: { authorization: '' } } as Request;

		authGuard.extractTokenFromHeader = jest.fn().mockReturnValue(undefined);

		expect(authGuard.extractTokenFromHeader(mockRequest)).toEqual(undefined);
	});

	it('extractTokenFromHeader unit test not Bearer return undefied', () => {
		const mockRequest = { headers: { authorization: 'testtoke' } } as Request;

		authGuard.extractTokenFromHeader = jest.fn().mockReturnValue(undefined);

		expect(authGuard.extractTokenFromHeader(mockRequest)).toEqual(undefined);
	});

	it('extractTokenFromHeader unit test not Bearer return token', () => {
		const mockRequest = { headers: { authorization: 'Bearer testtoken' } } as Request;

		authGuard.extractTokenFromHeader = jest.fn().mockReturnValue('testtoken');
		expect(authGuard.extractTokenFromHeader(mockRequest)).toEqual('testtoken');
	});

	const mockContext = {
		switchToHttp: () => ({
			getRequest: () => ({
				headers: {
					authorization: 'Bearer Token',
				},
			}),
		}),
	} as any;

	it('auth guard canActivate token undefined UnauthorizedException test', () => {
		authGuard.extractTokenFromHeader = jest.fn().mockReturnValue(undefined);

		expect(() => authGuard.canActivate(mockContext)).rejects.toThrow(new UnauthorizedException());
	});

	it('jwtSerivce.verifiyAsync exception test', () => {
		authGuard.extractTokenFromHeader = jest.fn().mockReturnValue('token');
		jwtService.verifyAsync = jest.fn().mockRejectedValue(() => {
			throw new UnauthorizedException();
		});

		expect(async () => await authGuard.canActivate(mockContext)).rejects.toThrow(new UnauthorizedException());
	});

	it('auth guard success', async () => {
		authGuard.extractTokenFromHeader = jest.fn().mockReturnValue('token');
		jwtService.verifyAsync = jest.fn().mockResolvedValue('payload');

		const result = await authGuard.canActivate(mockContext);
		expect(result).toBe(true);
	});
});

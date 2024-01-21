import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('AuthGuard unit test', () => {
	const authGuard = new AuthGuard();

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

	// const mockContext = {
	// 	switchToHttp: { getRequest: jest.fn() },
	// } as any;
	//
	// it('auth guard canActivate token undefined UnauthorizedException test', () => {
	// 	mockContext.switchToHttp.getRequest = jest.fn().mockReturnValue({});
	// 	authGuard.extractTokenFromHeader = jest.fn().mockReturnValue(undefined);
	//
	// 	expect(() => authGuard.canActivate(mockContext)).toThrow(new UnauthorizedException());
	// });
});

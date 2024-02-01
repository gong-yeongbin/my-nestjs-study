import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';

const mockAuthGuard = {
	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		request['user'] = { id: 1 };
		return true;
	},
};

describe('AuthController', () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule],
			controllers: [AuthController],
			providers: [AuthService, JwtService],
		})
			.overrideGuard(AuthGuard)
			.useValue(mockAuthGuard)
			.compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);
	});

	const mockUser = {
		idx: 1,
		id: 'userId1',
		name: 'john',
	};

	it('auth signIn service 1번 호출 유무', async () => {
		service.signIn = jest.fn().mockResolvedValue(mockUser);

		await controller.signIn({ username: 'userId1', password: '1112' });
		expect(service.signIn).toBeCalledTimes(1);
	});

	it('auth getProfile define test', () => {
		expect(controller.getProfile).toBeDefined();
	});
});

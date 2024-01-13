import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from './dtos';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService, UserRepository, PrismaService],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('service createUser calles time 1', async () => {
		const createUserDto: CreateUserDto = { id: '1', name: '홍길동' };
		const createUser = { idx: 1, ...createUserDto };
		service.createUser = jest.fn().mockResolvedValue(createUser);

		await controller.create(createUserDto);
		expect(service.createUser).toBeCalledTimes(1);
	});
});

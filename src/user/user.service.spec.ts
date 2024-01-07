import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos';

describe('UserService', () => {
	let service: UserService;
	let repository: UserRepository;
	const createUserDto: CreateUserDto = { id: 'create_user', name: '홍길동' };

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, UserRepository, PrismaService],
		}).compile();

		service = module.get<UserService>(UserService);
		repository = module.get<UserRepository>(UserRepository);
	});

	it('create user user_id 중복 error', () => {
		const findUser = { idx: 1, ...createUserDto };
		jest.spyOn(repository, 'findByUserId').mockResolvedValue(findUser);

		expect(async () => await service.createUser(createUserDto)).rejects.toThrow();
	});

	it('create user create return error', () => {
		jest.spyOn(repository, 'findByUserId').mockResolvedValue(null);
		jest.spyOn(repository, 'createUser').mockResolvedValue(null);

		expect(async () => await service.createUser(createUserDto)).rejects.toThrow();
	});

	it('create user repository call time', async () => {
		const createUser = { idx: 1, ...createUserDto };

		jest.spyOn(repository, 'findByUserId').mockResolvedValue(null);
		jest.spyOn(repository, 'createUser').mockResolvedValue(createUser);

		await service.createUser(createUserDto);

		expect(repository.findByUserId).toBeCalledTimes(1);
		expect(repository.createUser).toBeCalledTimes(1);
	});
});

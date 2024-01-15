import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
	let service: UserService;
	let repository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, UserRepository, PrismaService],
		}).compile();

		service = module.get<UserService>(UserService);
		repository = module.get<UserRepository>(UserRepository);
	});

	const createUserDto: CreateUserDto = { id: 'create_user', name: '홍길동' };

	it('create user user_id 중복 error', () => {
		repository.findByUserId = jest.fn().mockResolvedValue({ idx: 1, ...createUserDto });

		expect(async () => await service.createUser(createUserDto)).rejects.toThrow();
	});

	it('create user create return error', () => {
		repository.findByUserId = jest.fn().mockResolvedValue(null);
		repository.createUser = jest.fn().mockResolvedValue(null);

		expect(async () => await service.createUser(createUserDto)).rejects.toThrow();
	});

	it('create user repository call time', async () => {
		const createUser = { idx: 1, ...createUserDto };

		repository.findByUserId = jest.fn().mockResolvedValue(null);
		repository.createUser = jest.fn().mockResolvedValue(createUser);

		await service.createUser(createUserDto);

		expect(repository.findByUserId).toBeCalledTimes(1);
		expect(repository.createUser).toBeCalledTimes(1);
	});

	const findOneByUserNameDto: { name: string } = { name: 'userName' };

	it('findOneByUserName 1 call', async () => {
		jest.spyOn(repository, 'findOneByUserName').mockReturnValue({ idx: 1, id: 'userId', ...findOneByUserNameDto });
		await service.findOneByUserName(findOneByUserNameDto.name);

		expect(repository.findOneByUserName).toBeCalledTimes(1);
	});

	it('findOneByUserName return undefined test', () => {
		repository.findOneByUserName = jest.fn().mockReturnValue(undefined);

		expect(async () => service.findOneByUserName(findOneByUserNameDto.name)).rejects.toThrow(new NotFoundException());
	});

	it('findOneByUserName return success', async () => {
		repository.findOneByUserName = jest.fn().mockResolvedValue({ idx: 1, id: 'userId1', ...findOneByUserNameDto });

		const result = await service.findOneByUserName(findOneByUserNameDto.name);
		expect(result).toEqual({ idx: 1, id: 'userId1', ...findOneByUserNameDto });
	});
});

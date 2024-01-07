import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos';

describe('UserRepository', () => {
	let repository: UserRepository;
	let prisma: PrismaService;

	const createUserDto: CreateUserDto = { id: 'user_id', name: '홍길동' };

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserRepository, PrismaService],
		}).compile();

		repository = module.get<UserRepository>(UserRepository);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('user findByUserId 테스트 결과 null', async () => {
		jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);

		const result = await repository.findByUserId(createUserDto.id);

		expect(prisma.user.findFirst).toBeCalledTimes(1);
		expect(result).toBe(null);
	});

	it('user findByUserId 테스트 결과 not null ', async () => {
		const findUser = { idx: 1, ...createUserDto };
		jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(findUser);

		const result = await repository.findByUserId(createUserDto.id);

		expect(prisma.user.findFirst).toBeCalledTimes(1);
		expect(result).toBe(findUser);
	});

	it('user create 테스트 결과 false', async () => {
		jest.spyOn(prisma.user, 'create').mockResolvedValue(null);

		const result = await repository.createUser(createUserDto);

		expect(prisma.user.create).toBeCalledTimes(1);
		expect(result).toBe(false);
	});

	it('user create 테스트 결과 true', async () => {
		const createUser = { idx: 1, ...createUserDto };

		jest.spyOn(prisma.user, 'create').mockResolvedValue(createUser);

		const result = await repository.createUser(createUserDto);

		expect(prisma.user.create).toBeCalledTimes(1);
		expect(result).toBe(true);
	});
});

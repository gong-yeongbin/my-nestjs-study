import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos';

describe('UserRepository', () => {
	let repository: UserRepository;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserRepository, PrismaService],
		}).compile();
		repository = module.get<UserRepository>(UserRepository);

		prisma = module.get<PrismaService>(PrismaService);
	});

	const createUserDto: CreateUserDto = { id: 'user_id', name: '홍길동' };

	it('user findByUserId 테스트 결과 null', async () => {
		jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);
		const result = await repository.findByUserId('userId');

		expect(result).toBe(null);
	});

	it('user findByUserId 테스트 결과 not null ', async () => {
		jest.spyOn(prisma.user, 'findFirst').mockResolvedValue({ idx: 1, ...createUserDto });
		await repository.findByUserId('userId');

		expect(prisma.user.findFirst).toBeCalledTimes(1);
	});

	it('user create 테스트 결과 failed', async () => {
		jest.spyOn(prisma.user, 'create').mockResolvedValue({ idx: 1, ...createUserDto });
		await repository.createUser(createUserDto);

		expect(prisma.user.create).toBeCalledTimes(1);
	});

	const findOneByUserNameDto: { name: string } = { name: 'findUserName' };

	it('find one by user name test', async () => {
		// jest.spyOn(prisma.user, 'findFirst').mockResolvedValue({ idx: 1, id: 'userId', ...findOneByUserNameDto });
		//
		// await repository.findOneByUserName(findOneByUserNameDto.name);
		//
		// expect(prisma.user.findFirst).toBeCalledTimes(1);
	});
});

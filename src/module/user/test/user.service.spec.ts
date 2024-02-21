import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../../prisma.service';
import { ConflictException } from '@nestjs/common';

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

	it('user findOne not found user', () => {
		const result = service.findOne('john1');
		expect(result).toEqual(undefined);
	});

	it('user findOne find user', () => {
		const result = service.findOne('john');
		expect(result).toEqual({ userId: 1, username: 'john', password: 'changeme' });
	});

	const mockUserDto = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName' };
	const mockUserInfo = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName', profile_img: null, created_at: new Date() };

	it('비밀번호 암호화 함수', async () => {
		const result = await service.hashPassword(mockUserDto.password);
		expect(result).not.toBeUndefined();
		expect(result).not.toBeNull();
		expect(result).not.toEqual(mockUserDto.password);
	});

	it('회원가입, user_id 중복 409', () => {
		repository.findOne = jest.fn().mockResolvedValue(mockUserInfo);
		expect(async () => await service.createUser(mockUserDto)).rejects.toThrow(new ConflictException());
	});

	it('회원가입, 비밀번호 해쉬함수 호출 여부', async () => {
		jest.spyOn(service, 'hashPassword');
		await service.createUser(mockUserDto);
		expect(service.hashPassword).toBeCalledTimes(1);
	});

	it('회원가입, 비밀번호 해쉬 후 저장', async () => {
		jest.spyOn(repository, 'create');
		await service.createUser(mockUserDto);
		expect(repository.create).toBeCalledTimes(1);
	});

	it.todo('회원탈퇴');
	it.todo('프로필사진 업로드');
	it.todo('프로필사진 수정');
	it.todo('프로필사진 삭제');
});

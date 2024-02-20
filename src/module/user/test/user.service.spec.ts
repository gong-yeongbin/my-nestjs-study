import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../../prisma.service';

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

	const mockUser = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName' };
	it('회원가입, user_id 중복 409', () => {});

	it.todo('비밀번호변경');
	it.todo('회원탈퇴');
	it.todo('프로필사진 업로드');
	it.todo('프로필사진 수정');
	it.todo('프로필사진 삭제');
});

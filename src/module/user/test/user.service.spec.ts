import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('user findOne not found user', () => {
		const result = service.findOne('john1');
		expect(result).toEqual(undefined);
	});

	it('user findOne find user', () => {
		const result = service.findOne('john');
		expect(result).toEqual({ userId: 1, username: 'john', password: 'changeme' });
	});

	it.todo('회원가입');
	it.todo('비밀번호변경');
	it.todo('회원탈퇴');
	it.todo('프로필사진 업로드');
	it.todo('프로필사진 수정');
	it.todo('프로필사진 삭제');
});

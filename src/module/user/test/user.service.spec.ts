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
});

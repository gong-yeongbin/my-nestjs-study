import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockRepositroy = {
	findOne: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
};

describe('UserService', () => {
	let service: UserService;
	let repository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, { provide: UserRepository, useValue: mockRepositroy }],
		}).compile();

		service = module.get<UserService>(UserService);
		repository = module.get<UserRepository>(UserRepository);
	});

	const mockUserDto = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName' };
	let mockUserInfo = {};
	mockUserInfo = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName', profile_img: null, created_at: new Date() };

	it('비밀번호 암호화 함수', async () => {
		const result = await service.hashPassword('mockUserPassword');
		expect(result).not.toBeUndefined();
		expect(result).not.toBeNull();
		expect(result).not.toEqual('mockUserPassword');
	});

	it('user findOne not found user', () => {
		repository.findOne = jest.fn().mockResolvedValue(undefined);

		const result = service.findOne('mockUserId');

		expect(repository.findOne).toBeCalledTimes(1);
		expect(result).rejects.toThrow(new NotFoundException());
	});

	it('user findOne find user', async () => {
		repository.findOne = jest.fn().mockResolvedValue(mockUserInfo);

		const result = await service.findOne('mockUserId');

		expect(repository.findOne).toBeCalledTimes(1);
		expect(result).toEqual(mockUserInfo);
	});

	it('회원가입, user_id 중복 409', () => {
		repository.findOne = jest.fn().mockResolvedValue(mockUserInfo);
		expect(async () => await service.createUser(mockUserDto)).rejects.toThrow(new ConflictException());
	});

	it('회원가입, 비밀번호 해쉬함수 호출 여부', async () => {
		repository.findOne = jest.fn().mockResolvedValue(undefined);
		service.hashPassword = jest.fn();

		await service.createUser(mockUserDto);
		expect(service.hashPassword).toBeCalledTimes(1);
	});

	it('회원가입, 비밀번호 해쉬 후 저장', async () => {
		repository.findOne = jest.fn().mockResolvedValue(undefined);
		repository.create = jest.fn();
		service.hashPassword = jest.fn();

		await service.createUser(mockUserDto);
		expect(repository.create).toBeCalledTimes(1);
	});

	it('회원탈퇴, user_id NotFoundException', () => {
		repository.findOne = jest.fn().mockResolvedValue(null);

		expect(async () => await service.deleteUser('mockUserId')).rejects.toThrow(new NotFoundException());
	});

	it('회원탈퇴, 탈퇴 성공', async () => {
		repository.findOne = jest.fn().mockResolvedValue(mockUserInfo);
		repository.delete = jest.fn().mockResolvedValue(mockUserInfo);

		await service.deleteUser('mockUserId');
		expect(repository.delete).toBeCalledTimes(1);
	});

	const mockUpdateUser = { user_id: 'mockUserId', nick_name: 'mockNickName', profile_img: 'mockProfileImg' };

	it('회원 정보 수정(updateUser), NotFoundException 테스트', () => {
		repository.findOne = jest.fn().mockResolvedValue(null);

		expect(() => service.updateUser(mockUpdateUser)).rejects.toThrow(new NotFoundException());
	});

	it('회원 정보 수정(updateUser), userRepository 호출 테스트', async () => {
		repository.findOne = jest.fn().mockResolvedValue(true);
		repository.update = jest.fn();

		await service.updateUser({ user_id: 'mockUserId', nick_name: 'mockNickName', profile_img: 'mockProfileImg' });

		expect(repository.update).toBeCalledTimes(1);
	});

	it('회원 정보 수정(updateUser)', async () => {
		mockUpdateUser['created_at'] = new Date();
		repository.findOne = jest.fn().mockResolvedValue(true);
		repository.update = jest.fn().mockResolvedValue(mockUpdateUser);

		const result = await service.updateUser(mockUpdateUser);
		expect(result).toEqual(mockUpdateUser);
	});
});

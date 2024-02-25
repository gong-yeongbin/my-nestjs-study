import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../../prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

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

	const mockUserDto = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName' };
	let mockUserInfo = {};
	mockUserInfo = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName', profile_img: null, created_at: new Date() };

	it('user findOne not found user', () => {
		repository.findOne = jest.fn().mockResolvedValue(null);

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

	it('비밀번호 암호화 함수', async () => {
		const result = await service.hashPassword('mockUserPassword');
		expect(result).not.toBeUndefined();
		expect(result).not.toBeNull();
		expect(result).not.toEqual('mockUserPassword');
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

	it('프로필사진 업로드', async () => {
		mockUserInfo['profile_img'] = 'aws image path';
		jest.spyOn(repository, 'imageUpload').mockResolvedValue(mockUserInfo);

		const result = await service.updateProfileImage('mockUserId', 'mockImageUrl');

		expect(repository.imageUpload).toBeCalledTimes(1);
		expect(result).toEqual(mockUserInfo);
	});
});

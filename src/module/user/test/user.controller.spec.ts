import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaModule } from '../../prisma/prisma.module';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule],
			controllers: [UserController],
			providers: [UserService, UserRepository],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	const mockCreateUser: CreateUserDto = { user_id: 'mockUserId', password: 'mockUserPassword', nick_name: 'mockNickName' };
	const mockDeleteUser = { user_id: 'mockUserId' };

	it('유저 생성(createUser), userService.createUser 호출 테스트', async () => {
		service.createUser = jest.fn();

		await controller.createUser(mockCreateUser);
		expect(service.createUser).toBeCalledTimes(1);
	});

	it('유저 생성(createUser), userService.createUser', () => {
		jest.spyOn(service, 'createUser');

		const result = controller.createUser(mockCreateUser);
		expect(result).not.toEqual(mockCreateUser);
	});

	it('유저 삭제(deleteUser), userService.deleteUser 호출 테스트', async () => {
		service.deleteUser = jest.fn();

		await controller.deleteUser(mockDeleteUser);
		expect(service.deleteUser).toBeCalledTimes(1);
	});

	const mockUpdateUser = { user_id: 'mockUserId', nick_name: 'mockNickName', profile_img: 'mockProfileImg' };
	it('유저 정보 수정(updateUser), userService.updateUser 호출 테스트', () => {
		service.updateUser = jest.fn();
		controller.updateUser(mockUpdateUser);

		expect(service.updateUser).toBeCalledTimes(1);
	});

	it('유저 정보 수정(updateUser)', async () => {
		const mockReturnUserUpdate = { ...mockUpdateUser };
		mockReturnUserUpdate['created_at'] = new Date();

		service.updateUser = jest.fn().mockResolvedValue(mockReturnUserUpdate);

		const result = await controller.updateUser(mockUpdateUser);
		expect(result).toEqual(mockReturnUserUpdate);
	});
});

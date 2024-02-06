import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos';

export type User = {
	userId: number;
	username: string;
	password: string;
};

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async createUser(createUserDto: CreateUserDto) {
		const userEntity = await this.userRepository.findByUserId(createUserDto.id);

		if (userEntity) throw new Error();

		const createUserResult = await this.userRepository.createUser(createUserDto);

		if (!createUserResult) throw new Error();

		return createUserResult;
	}

	async findOneByUserName(name: string) {
		const userEntity = this.userRepository.findOneByUserName(name);

		if (!userEntity) throw new NotFoundException();

		return userEntity;
	}

	private readonly users = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme',
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess',
		},
	];

	async findOne(name: string): Promise<User | undefined> {
		return this.users.find((user) => user.username == name);
	}
}

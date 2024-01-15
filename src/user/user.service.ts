import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos';

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
}

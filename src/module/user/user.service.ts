import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

export type User = any;

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findOne(userId: string): Promise<User | undefined> {
		const user = await this.userRepository.findOne(userId);

		if (!user) throw new NotFoundException();

		return user;
	}

	async hashPassword(password: string): Promise<string> {
		const saltCost = 10;
		return await bcrypt.hash(password, saltCost);
	}

	async createUser(createUserDto: CreateUserDto) {
		const user = await this.userRepository.findOne(createUserDto.user_id);

		if (user) throw new ConflictException();

		createUserDto.password = await this.hashPassword(createUserDto.password);
		await this.userRepository.create(createUserDto);
	}

	async deleteUser(userId: string) {
		const user = await this.userRepository.findOne(userId);

		if (!user) throw new NotFoundException();

		await this.userRepository.delete(userId);
	}

	async updateUser(updateUserDto: { user_id: string; nick_name: string; profile_img: string }) {
		const user = await this.userRepository.findOne(updateUserDto.user_id);

		if (!user) throw new NotFoundException();

		return await this.userRepository.update(updateUserDto);
	}
}

import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}
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

	findOne(username: string): User | undefined {
		return this.users.find((user) => user.username === username);
	}

	async hashPassword(password: string): Promise<string> {
		const saltCost = 10;
		return await bcrypt.hash(password, saltCost);
	}

	async createUser(createUserDto: { user_id: string; password: string; nick_name: string }) {
		const user = await this.userRepository.findOne(createUserDto.user_id);

		if (user) throw new ConflictException();

		createUserDto.password = await this.hashPassword(createUserDto.password);
		await this.userRepository.create(createUserDto);
	}
}

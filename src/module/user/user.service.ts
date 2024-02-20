import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

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
}

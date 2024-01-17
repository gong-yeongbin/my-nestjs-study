import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	async findByUserId(id: string): Promise<User | null> {
		try {
			const user = await this.prisma.user.findFirst({ where: { id: id } });
			return user ? user : null;
		} catch (e) {
			console.log(e);
		}
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		try {
			return await this.prisma.user.create({ data: createUserDto });
		} catch (e) {
			console.log(e);
		}
	}

	private readonly users = [
		{
			idx: 1,
			id: 'userId1',
			name: 'john',
			password: '1111',
		},
		{
			idx: 2,
			id: 'userId2',
			name: 'maria',
			password: '1111',
		},
	];

	findOneByUserName(name: string) {
		try {
			return this.users.find((user) => user.name == name);
			// return await this.prisma.user.findFirst({ where: { name: name } });
		} catch (e) {
			console.log(e);
		}
	}
}

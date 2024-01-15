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
}

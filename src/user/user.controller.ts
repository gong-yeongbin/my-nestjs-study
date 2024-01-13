import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		const createUser = await this.userService.createUser(createUserDto);
		return createUser;
	}
}

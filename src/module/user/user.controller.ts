import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto);
	}

	@Delete(':user_id')
	async deleteUser(@Param() deleteUserDto: DeleteUserDto) {
		return await this.userService.deleteUser(deleteUserDto.user_id);
	}

	@Patch()
	async updateUser(@Body() updateUserDto: UpdateUserDto) {
		return await this.userService.updateUser(updateUserDto);
	}
}

import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	user_id: string;

	@IsString()
	password: string;

	@IsString()
	nick_name: string;

	@IsString()
	@IsOptional()
	profile_img?: string;
}

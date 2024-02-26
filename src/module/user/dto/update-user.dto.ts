import { IsString } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	user_id: string;

	@IsString()
	nick_name: string;

	@IsString()
	profile_img: string;
}

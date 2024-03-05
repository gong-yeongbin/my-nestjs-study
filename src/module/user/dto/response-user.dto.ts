import { IsDate, IsString } from 'class-validator';

export class ResponseUserDto {
	@IsString()
	user_id: string;

	@IsString()
	nick_name: string;

	@IsString()
	profile_img: string | null;

	@IsDate()
	created_at: Date;
}

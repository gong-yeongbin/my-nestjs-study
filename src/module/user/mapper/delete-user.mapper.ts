import { UserEntity } from '../entity/user.entity';
import { ResponseUserDto } from '../dto/response-user.dto';

export class DeleteUserMapper {
	static fromEntity(entity: UserEntity): ResponseUserDto {
		const dto = new ResponseUserDto();
		dto.user_id = entity.user_id;
		dto.nick_name = entity.nick_name;
		dto.profile_img = entity.profile_img;
		dto.created_at = entity.created_at;
		return dto;
	}
}

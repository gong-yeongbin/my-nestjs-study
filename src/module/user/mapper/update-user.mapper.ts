import { UserEntity } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';

export class UpdateUserMapper {
	static toEntity(dto: UpdateUserDto): UserEntity {
		return new UserEntity({
			user_id: dto.user_id,
			nick_name: dto.nick_name,
			profile_img: dto.profile_img,
		});
	}

	static fromEntity(entity: UserEntity): ResponseUserDto {
		const dto = new ResponseUserDto();
		dto.user_id = entity.user_id;
		dto.nick_name = entity.nick_name;
		dto.profile_img = entity.profile_img;
		dto.created_at = entity.created_at;
		return dto;
	}
}

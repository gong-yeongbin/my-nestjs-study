import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';

export class CreateUserMapper {
	static toEntity(dto: CreateUserDto): UserEntity {
		return new UserEntity({
			user_id: dto.user_id,
			password: dto.password,
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

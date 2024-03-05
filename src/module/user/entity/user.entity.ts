import { User } from '@prisma/client';

export class UserEntity implements User {
	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}

	user_id: string;
	password: string;
	nick_name: string;
	profile_img: string | null;
	created_at: Date;
}

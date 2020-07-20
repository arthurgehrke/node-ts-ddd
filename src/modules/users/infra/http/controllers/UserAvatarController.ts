import { Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRepository = new UsersRepository();

export default class UserAvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

		const user = await updateUserAvatar.execute({
			user_id: JSON.parse(request.user.id),
			avatarFilename: request.file.filename,
		});

		delete user.password;

		return response.status(202).json(user);
	}
}

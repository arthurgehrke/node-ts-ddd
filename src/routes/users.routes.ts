import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
	const usersRepository = getCustomRepository(UsersRepository);
	const users = await usersRepository.find();

	return response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({ email, password });

	delete user.password;

	return response.status(201).json(user);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const updateUserAvatar = new UpdateUserAvatarService();

		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		});

		delete user.password;

		return response.status(202).json(user);
	},
);

export default usersRouter;

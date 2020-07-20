import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersRepository = new UsersRepository();

usersRouter.get('/', async (request, response) => {
	const users = await usersRepository.findAll();

	return response.status(200).json(users);
});

usersRouter.get('/:id', async (request, response) => {
	const user = await usersRepository.findById(JSON.parse(request.user.id));

	return response.status(200).json(user);
});

usersRouter.post('/', async (request, response) => {
	const { email, password } = request.body;

	const createUser = new CreateUserService(usersRepository);

	const user = await createUser.execute({ email, password });

	delete user.password;

	return response.status(201).json(user);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

		const user = await updateUserAvatar.execute({
			user_id: JSON.parse(request.user.id),
			avatarFilename: request.file.filename,
		});

		delete user.password;

		return response.status(202).json(user);
	},
);

export default usersRouter;

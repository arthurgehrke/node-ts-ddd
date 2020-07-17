import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
	const usersRepository = getCustomRepository(UsersRepository);
	const users = await usersRepository.find();

	return response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({ email, password });

		delete user.password;

		return response.status(201).json(user);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {},
);

export default usersRouter;

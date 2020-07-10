import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
	const usersRepository = getCustomRepository(UsersRepository);
	const users = usersRepository.find();

	return response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({ email, password });

		return response.status(201).json(user);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default usersRouter;

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

const usersRepository = new UsersRepository();

export default class UsersControllers {
	public async index(request: Request, response: Response): Promise<Response> {
		const users = await usersRepository.findAll();

		return response.status(200).json(users);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const createUser = new CreateUserService(usersRepository);

		const user = await createUser.execute({ email, password });

		delete user.password;

		return response.status(201).json(user);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const user = await usersRepository.findById(JSON.parse(request.user.id));

		return response.status(200).json(user);
	}
}

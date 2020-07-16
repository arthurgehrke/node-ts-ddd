import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ email, password }: Request): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const findUserWithSameEmail = await usersRepository.findByEmail(email);

		if (findUserWithSameEmail) throw Error('This email is already taken');

		const hashedPassword = await hash(password, 8);

		const user = usersRepository.create({ email, password: hashedPassword });

		await usersRepository.save(user);

		return user;
	}
}

export default CreateUserService;

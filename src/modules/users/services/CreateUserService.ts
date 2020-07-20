import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
	email: string;
	password: string;
}

class CreateUserService {
	constructor(private usersRepository: IUserRepository) {}

	public async execute({ email, password }: IRequest): Promise<User> {
		const findUserWithSameEmail = await this.usersRepository.findByEmail(email);

		if (findUserWithSameEmail)
			throw new AppError('This email is already taken');

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;

/* eslint-disable @typescript-eslint/ban-types */
import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findAll(): Promise<Array<User>> {
		const users = await this.ormRepository.find();

		return users;
	}

	public async findById(id: number): Promise<User | undefined> {
		const user = await this.ormRepository.findOne(id);

		return user || undefined;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const findUser = await this.ormRepository.findOne({
			where: { email },
		});

		return findUser || undefined;
	}

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create(userData);

		await this.ormRepository.save(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UsersRepository;

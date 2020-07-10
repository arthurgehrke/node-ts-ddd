import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
	public async findByName(name: string): Promise<User | null> {
		const findUser = await this.findOne({
			where: { name },
		});

		return findUser || null;
	}
}

export default UsersRepository;

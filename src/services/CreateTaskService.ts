/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Task from '../models/Task';

import AppError from '../errors/AppError';

interface Request {
	name: string;
	date: Date;
	user_id: string;
}

class CreateTaskService {
	public async execute({ name, date, user_id }: Request): Promise<Task> {
		const tasksRepository = getRepository(Task);

		const checkTaskExists = await tasksRepository.findOne({
			where: { name },
		});

		if (checkTaskExists) {
			throw new AppError('This name is already used');
		}

		const task = tasksRepository.create({ name, date, user_id });

		await tasksRepository.save(task);

		return task;
	}
}

export default CreateTaskService;

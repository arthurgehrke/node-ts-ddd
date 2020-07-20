import ITaskRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
	name: string;
	date: Date;
	user_id: string;
}

@injectable()
class CreateTaskService {
	constructor(
		@inject('TaskRepository')
		private tasksRepository: ITaskRepository,
	) {}

	public async execute({ name, date, user_id }: IRequest): Promise<Task> {
		const checkTaskExists = await this.tasksRepository.findByName(name);

		if (checkTaskExists) {
			throw new AppError('This name is already used');
		}

		const task = this.tasksRepository.execute({ name, date, user_id });

		return task;
	}
}

export default CreateTaskService;

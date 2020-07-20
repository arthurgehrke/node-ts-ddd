import { getRepository, Repository } from 'typeorm';

import ITaskRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

class TasksRepository implements ITaskRepository {
	private ormRepository: Repository<Task>;

	constructor() {
		this.ormRepository = getRepository(Task);
	}

	public async findByName(name: string): Promise<Task | undefined> {
		const task = await this.ormRepository.findOne({ where: { name } });

		return task;
	}

	public async execute({ name, date, user_id }: ICreateTaskDTO): Promise<Task> {
		const task = await this.ormRepository.create({ name, date, user_id });

		await this.ormRepository.save(task);

		return task;
	}
}

export default TasksRepository;

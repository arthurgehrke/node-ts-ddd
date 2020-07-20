import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';

export default class TaskController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, date, user_id } = request.body;

		const createTask = container.resolve(CreateTaskService);

		const task = await createTask.execute({ name, date, user_id });

		return response.status(201).json(task);
	}
}

/* eslint-disable camelcase */
import { Router } from 'express';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const tasksRouter = Router();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/', async (request, response) => {
	const { name, date, user_id } = request.body;

	const createTask = new CreateTaskService();

	const task = await createTask.execute({ name, date, user_id });

	return response.status(201).json(task);
});

export default tasksRouter;

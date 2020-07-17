/* eslint-disable camelcase */
import { Router } from 'express';

import CreateTaskService from '../services/CreateTaskService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const tasksRouter = Router();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/', async (request, response) => {
	try {
		const { name, date, user_id } = request.body;

		const createTask = new CreateTaskService();

		const task = await createTask.execute({ name, date, user_id });

		return response.status(201).json(task);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default tasksRouter;

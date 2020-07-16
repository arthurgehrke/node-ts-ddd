import { Router } from 'express';

import usersRouter from './users.routes';
import tasksRouter from './tasks.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);

export default routes;

import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

import { container } from 'tsyringe';

import ITaskRepository from '@modules/tasks/repositories/ITasksRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

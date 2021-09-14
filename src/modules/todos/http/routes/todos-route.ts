import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import TodosController from '@http/controllers/todos-controller';
import createTodoRequestSchema from '@http/schemas/create-todo-request-schema';
import listTodosQuerySchema from '@http/schemas/list-todos-query-schema';

const todosRouter = Router();
const todosController = new TodosController();

todosRouter.get(
  '/',
  celebrate({ [Segments.QUERY]: listTodosQuerySchema }),
  todosController.list.bind(todosController),
);

todosRouter.post(
  '/',
  celebrate({ [Segments.BODY]: createTodoRequestSchema }),
  todosController.create.bind(todosController),
);

export default todosRouter;

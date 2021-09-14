import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import TodosController from '@http/controllers/todos-controller';
import createTodoRequestSchema from '@http/schemas/create-todo-request-schema';

const todosRouter = Router();
const todosController = new TodosController();

todosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: createTodoRequestSchema,
  }),
  todosController.create.bind(todosController),
);

export default todosRouter;

import { Router } from 'express';

import TodosController from '@http/controllers/todos-controller';

const todosRouter = Router();
const todosController = new TodosController();

todosRouter.post('/', todosController.create.bind(todosController));

export default todosRouter;

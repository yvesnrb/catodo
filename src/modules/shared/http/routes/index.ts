import { Router } from 'express';

import todosRouter from '@http/routes/todos-route';

const routes = Router();

routes.use('/todos', todosRouter);

export default routes;

import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import CreateTodoService from '@services/create-todo-service';
import ListTodosService from '@services/list-todos-service';
import Todo from '@entities/todo-entity';

export default class TodosController {
  private createTodo: CreateTodoService;

  private listTodos: ListTodosService;

  constructor() {
    this.createTodo = new CreateTodoService(
      getConnection().getMongoRepository(Todo),
    );

    this.listTodos = new ListTodosService(
      getConnection().getMongoRepository(Todo),
    );
  }

  public async list(request: Request, response: Response): Promise<void> {
    const { page } = request.query;
    const list = await this.listTodos.execute({
      page: page as unknown as number,
    });

    response.json(list);
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { body } = request.body;
    const todo = await this.createTodo.execute({ body });

    response.json(todo);
  }
}

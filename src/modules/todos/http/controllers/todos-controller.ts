import { Request, Response } from 'express';
import { getMongoRepository, getConnection } from 'typeorm';

import CreateTodoService from '@services/create-todo-service';
import Todo from '@entities/todo-entity';

export default class TodosController {
  private createTodo: CreateTodoService;

  constructor() {
    this.createTodo = new CreateTodoService(
      getConnection().getMongoRepository(Todo),
    );
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { body } = request.body;
    const todo = await this.createTodo.execute({ body });

    response.json(todo);
  }
}

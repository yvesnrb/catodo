import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import CreateTodoService from '@services/create-todo-service';
import ListTodosService from '@services/list-todos-service';
import UpdateTodoService from '@services/update-todo-service';
import RemoveTodoService from '@services/remove-todo-service';
import Todo from '@entities/todo-entity';

export default class TodosController {
  private listTodos: ListTodosService;

  private createTodo: CreateTodoService;

  private updateTodo: UpdateTodoService;

  private removeTodo: RemoveTodoService;

  constructor() {
    this.createTodo = new CreateTodoService(
      getConnection().getMongoRepository(Todo),
    );

    this.listTodos = new ListTodosService(
      getConnection().getMongoRepository(Todo),
    );

    this.updateTodo = new UpdateTodoService(
      getConnection().getMongoRepository(Todo),
    );

    this.removeTodo = new RemoveTodoService(
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

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { body, isComplete } = request.body;

    const todo = await this.updateTodo.execute({
      id,
      body,
      isComplete,
    });

    response.json(todo);
  }

  public async remove(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    await this.removeTodo.execute({ id });

    response.status(204).send();
  }
}

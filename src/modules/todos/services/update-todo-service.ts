import { MongoRepository } from 'typeorm';

import Todo from '@entities/todo-entity';
import AppError from '@errors/app-error';

interface IRequest {
  id: string;
  body: string;
  isComplete: boolean;
}

export default class UpdateTodoService {
  constructor(
    private todosRepository: MongoRepository<Todo>,
  ) {}

  public async execute(request: IRequest): Promise<Todo> {
    const { id, body, isComplete } = request;
    const todo = await this.todosRepository.findOne(id);

    if (!todo) throw new AppError('no todo found for updating', 404);

    const updatedTodo = await this.todosRepository.save({
      ...todo,
      body,
      isComplete,
    });

    return updatedTodo;
  }
}

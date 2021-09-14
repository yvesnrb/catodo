import { MongoRepository } from 'typeorm';

import Todo from '@entities/todo-entity';
import AppError from '@errors/app-error';

interface IRequest {
  id: string;
}

export default class RemoveTodoService {
  constructor(
    private todosRepository: MongoRepository<Todo>,
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const { id } = request;
    const todo = await this.todosRepository.findOne(id);

    if (!todo) throw new AppError('no todo found for removal', 404);

    await this.todosRepository.remove([todo]);
  }
}

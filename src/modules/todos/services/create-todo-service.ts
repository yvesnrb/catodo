import { inject, injectable } from 'tsyringe';
import { MongoRepository } from 'typeorm';

import Todo from '@entities/todo-entity';

interface IRequest {
  body: string;
}

@injectable()
export default class CreateTodoService {
  constructor(
    @inject('TodosRepository')
    private todosRepository: MongoRepository<Todo>,
  ) {}

  public async execute(request: IRequest): Promise<Todo> {
    const { body } = request;
    const todo = new Todo(body);

    const savedTodo = await this.todosRepository.save(todo);

    return savedTodo;
  }
}

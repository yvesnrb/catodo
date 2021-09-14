import { MongoRepository } from 'typeorm';

import Todo from '@entities/todo-entity';

interface IRequest {
  page: number;
}

interface IResponse {
  items: Todo[];
  page: number;
  totalPages: number;
}

export default class ListTodosService {
  constructor(
    private todosRepository: MongoRepository<Todo>,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { page } = request;
    // hardcoded page size of 10 for now.
    const take = 10;
    const skip = page * take;
    const todosCount = await this.todosRepository.count();
    const items = await this.todosRepository.find({ skip, take });

    return {
      items,
      page,
      totalPages: Math.ceil(todosCount / take),
    };
  }
}

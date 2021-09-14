import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import ListTodosService from '@services/list-todos-service';
import Todo from '@entities/todo-entity';

let listTodos: ListTodosService;
const mockTodosRepository = { find: jest.fn(), count: jest.fn() };
const mockTodo: Todo = {
  id: new ObjectID(),
  body: 'mock todo body',
  isComplete: false,
  createdAt: new Date('2021-01-01 12:00:00'),
  updatedAt: new Date('2021-01-01 12:00:00'),
};

jest.mock('@entities/todo-entity', () =>
  jest.fn().mockImplementation(() => mockTodo));

describe('CreateTodoService', () => {
  beforeEach(() => {
    listTodos = new ListTodosService(
      mockTodosRepository as unknown as MongoRepository<Todo>,
    );
  });

  it('should create a new todo and save it', async () => {
    mockTodosRepository.count.mockReturnValue(Promise.resolve(54));
    mockTodosRepository.find.mockReturnValue(Promise.resolve([mockTodo]));

    const list = await listTodos.execute({ page: 2 });
    expect(list).toStrictEqual({
      items: [mockTodo],
      page: 2,
      totalPages: 6,
    });
  });
});

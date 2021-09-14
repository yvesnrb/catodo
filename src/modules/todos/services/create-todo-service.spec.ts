import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import CreateTodoService from '@services/create-todo-service';
import Todo from '@entities/todo-entity';

let createTodo: CreateTodoService;
const mockTodosRepository = { save: jest.fn() };
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
    createTodo = new CreateTodoService(
      mockTodosRepository as unknown as MongoRepository<Todo>,
    );
  });

  it('should create a new todo and save it', async () => {
    mockTodosRepository.save.mockReturnValue(Promise.resolve(mockTodo));
    const todo = await createTodo.execute({ body: 'mock todo body' });
    expect(todo).toStrictEqual(mockTodo);
  });
});

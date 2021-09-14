import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import RemoveTodoService from '@services/remove-todo-service';
import Todo from '@entities/todo-entity';
import AppError from '@/errors/app-error';

let removeTodo: RemoveTodoService;
const mockTodosRepository = { remove: jest.fn(), findOne: jest.fn() };
const mockTodo: Todo = {
  id: new ObjectID('mock-todo-id'),
  body: 'mock todo body',
  isComplete: false,
  createdAt: new Date('2021-01-01 12:00:00'),
  updatedAt: new Date('2021-01-01 12:00:00'),
};

jest.mock('@entities/todo-entity', () =>
  jest.fn().mockImplementation(() => mockTodo));

describe('RemoveTodoService', () => {
  beforeEach(() => {
    removeTodo = new RemoveTodoService(
      mockTodosRepository as unknown as MongoRepository<Todo>,
    );
  });

  it('should remove a saved todo', async () => {
    mockTodosRepository.findOne.mockReturnValue(Promise.resolve(mockTodo));

    await removeTodo.execute({ id: 'mock-todo-id' });
    expect(mockTodosRepository.findOne).toHaveBeenCalledWith('mock-todo-id');
    expect(mockTodosRepository.remove).toHaveBeenCalledWith([mockTodo]);
  });

  it('should throw if the todo does not exist', async () => {
    mockTodosRepository.findOne.mockReturnValue(Promise.resolve(undefined));

    await expect(removeTodo.execute({ id: 'mock-todo-id' }))
      .rejects
      .toThrowError(new AppError('no todo found for removal', 404));
    expect(mockTodosRepository.findOne).toHaveBeenCalledWith('mock-todo-id');
  });
});

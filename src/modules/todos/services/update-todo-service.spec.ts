import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import UpdateTodoService from '@services/update-todo-service';
import Todo from '@entities/todo-entity';
import AppError from '@/errors/app-error';

let updateTodo: UpdateTodoService;
const mockTodosRepository = { save: jest.fn(), findOne: jest.fn() };
const mockTodo: Todo = {
  id: new ObjectID('mock-todo-id'),
  body: 'mock todo body',
  isComplete: false,
  createdAt: new Date('2021-01-01 12:00:00'),
  updatedAt: new Date('2021-01-01 12:00:00'),
};

jest.mock('@entities/todo-entity', () =>
  jest.fn().mockImplementation(() => mockTodo));

describe('UpdateTodoService', () => {
  beforeEach(() => {
    updateTodo = new UpdateTodoService(
      mockTodosRepository as unknown as MongoRepository<Todo>,
    );
  });

  it('should update a saved todo', async () => {
    mockTodosRepository.findOne.mockReturnValue(Promise.resolve(mockTodo));
    mockTodosRepository.save.mockReturnValue(Promise.resolve({
      ...mockTodo,
      body: 'updated todo body',
      isComplete: true,
    }));

    const todo = await updateTodo.execute({
      id: 'mock-todo-id',
      body: 'updated todo body',
      isComplete: true,
    });
    expect(todo).toStrictEqual({
      ...mockTodo,
      body: 'updated todo body',
      isComplete: true,
    });
    expect(mockTodosRepository.findOne).toHaveBeenCalledWith('mock-todo-id');
    expect(mockTodosRepository.save).toHaveBeenCalledWith({
      ...mockTodo,
      body: 'updated todo body',
      isComplete: true,
    });
  });

  it('should throw if the todo does not exist', async () => {
    mockTodosRepository.findOne.mockReturnValue(Promise.resolve(undefined));

    await expect(updateTodo.execute({
      id: 'mock-todo-id',
      body: 'updated todo body',
      isComplete: true,
    })).rejects.toThrowError(new AppError('no todo found for updating', 404));
    expect(mockTodosRepository.findOne).toHaveBeenCalledWith('mock-todo-id');
  });
});

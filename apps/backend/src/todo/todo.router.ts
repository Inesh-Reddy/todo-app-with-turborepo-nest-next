import { Inject } from '@nestjs/common';
import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { TodoService } from './todo.service';
import { Todo, TodoZodSchema } from './todo.schema';
import { z } from 'zod';

@Router({ alias: 'todo' })
export class TodoRouter {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @Query({
    output: z.array(TodoZodSchema),
  })
  getTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Query({
    output: z.array(TodoZodSchema),
  })
  getSingleTodo(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Mutation({
    input: TodoZodSchema,
    output: TodoZodSchema,
  })
  createTodo(@Input() input: Todo): Promise<Todo> {
    return this.todoService.createTodo(input);
  }
  @Mutation({
    input: TodoZodSchema,
    output: TodoZodSchema,
  })
  updateTodo(@Input() input: Todo): Promise<Todo | string> {
    return this.todoService.updateTodo(input);
  }

  @Mutation({
    input: z.string(),
    output: z.string(),
  })
  deleteTodo(@Input() id: string): Promise<string> {
    return this.todoService.deleteTodo(id);
  }
}

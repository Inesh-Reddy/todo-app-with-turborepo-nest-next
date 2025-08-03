import { Inject } from '@nestjs/common';
import { Todo } from 'generated/prisma';
import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { PTodoService } from './prismamod.service';
import { TodoZodSchema } from 'src/todo/todo.schema';

@Router({ alias: 'prismatodo' })
export class PTodoRouter {
  constructor(@Inject(PTodoService) private prismaTodo: PTodoService) {}
  @Query({
    output: z.array(TodoZodSchema),
  })
  getPTodos(): Promise<Todo[]> {
    return this.prismaTodo.getAllTodos();
  }

  @Mutation({
    input: TodoZodSchema,
    output: TodoZodSchema,
  })
  createPTodo(@Input() input: Todo): Promise<Todo> {
    return this.prismaTodo.createPTodos(input);
  }
}

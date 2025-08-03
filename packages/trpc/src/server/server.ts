import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todo: t.router({
    getTodos: publicProcedure.output(z.array(z.object({
      _id: z.string().optional(),
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getSingleTodo: publicProcedure.output(z.array(z.object({
      _id: z.string().optional(),
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createTodo: publicProcedure.input(z.object({
      _id: z.string().optional(),
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
    })).output(z.object({
      _id: z.string().optional(),
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateTodo: publicProcedure.input(z.object({
      _id: z.string().optional(),
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
    })).output(z.object({
      _id: z.string().optional(),
      id: z.string().optional(),
      title: z.string(),
      description: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteTodo: publicProcedure.input(z.string()).output(z.string()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  prismatodo: t.router({
    getPTodos: publicProcedure.output(z.array(TodoZodSchema)).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createPTodo: publicProcedure.input(TodoZodSchema).output(TodoZodSchema).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;


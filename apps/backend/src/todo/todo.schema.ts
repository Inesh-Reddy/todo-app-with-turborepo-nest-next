import { z } from 'zod';

export const TodoZodSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
});
export type Todo = z.infer<typeof TodoZodSchema>;

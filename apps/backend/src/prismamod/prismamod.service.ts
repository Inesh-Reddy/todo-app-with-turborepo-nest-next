import { Injectable } from '@nestjs/common';
import { PrismaService } from './prismamod.initialize';
import { Todo } from 'generated/prisma';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({ model: 'gpt-4' });

@Injectable()
export class PTodoService {
  constructor(private ptodoModel: PrismaService) {}

  async getAllTodos(): Promise<Todo[]> {
    const data = await this.ptodoModel.todo.findMany();
    const result: Todo[] = data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
    }));
    return result;
  }

  async createPTodos(inputTodo: Todo): Promise<Todo> {
    const { title } = inputTodo;
    try {
      const messages = [
        new SystemMessage(
          'Write a concise, user-friendly description for a TODO item titled:',
        ),
        new HumanMessage(title),
      ];

      const llmdata = await model.invoke(messages);
      const desc: string = llmdata?.content as string;
      const actualInputForDB = {
        title,
        description: desc,
      };

      const data = await this.ptodoModel.todo.create({
        data: actualInputForDB,
      });
      return {
        id: data.id,
        title: data.title,
        description: data.description,
      };
    } catch (error: any) {
      console.error('Failed to create TODO:', error);
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error?.message || 'Unknown error occurred while creating TODO',
      );
    }
  }
}

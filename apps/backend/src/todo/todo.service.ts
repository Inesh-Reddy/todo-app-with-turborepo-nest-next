/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { todoDocument } from 'src/db/db.schema';
import { Todo } from './todo.schema';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({ model: 'gpt-4' });

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('TodoMongooseSchema') private todoModel: Model<todoDocument>,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    const data = await this.todoModel.find();
    const result: Todo[] = data.map((item) => ({
      _id: item._id?.toString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: item.id ?? item._id?.toString(),
      title: item.title,
      description: item.description,
    }));
    return result;
  }

  async createTodo(input: Todo): Promise<Todo> {
    const { id, title } = input;

    try {
      const messages = [
        new SystemMessage(
          'Write a concise, user-friendly description for a TODO item titled:',
        ),
        new HumanMessage(title),
      ];

      const llmdata = await model.invoke(messages);

      const actualInputForDB = {
        id,
        title,
        description: llmdata?.content ?? 'No description generated.',
      };

      const data = await this.todoModel.create(actualInputForDB);

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        id: data.id.toString(),
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

  async updateTodo(input): Promise<Todo | string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { _id, id, title, description } = input;

    try {
      const data = await this.todoModel.findByIdAndUpdate(
        _id,
        { id, title, description },
        { new: true },
      );

      if (!data) return 'Todo not found';

      const result: Todo = {
        _id: data._id.toString(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: data.id ?? data._id.toString(),
        title: data.title || '',
        description: data.description || '',
      };

      return result;
    } catch (error) {
      return `error: ${error}`;
    }
  }

  async deleteTodo(id: string): Promise<string> {
    const data = await this.todoModel.findByIdAndDelete({
      _id: id,
    });
    try {
      if (data) {
        const result = `Successfully deleted todo with id: ${id}`;
        return result;
      }
    } catch (error) {
      return `error: ${error}`;
    }
    return `error`;
  }
}

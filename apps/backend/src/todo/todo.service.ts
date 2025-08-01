/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { todoDocument } from 'src/db/db.schema';
import { Todo } from './todo.schema';

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
    const data = await this.todoModel.create(input);
    const result = {
      _id: data?._id.toString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: data?.id.toString(),
      title: data.title,
      description: data.description,
    };
    return result;
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

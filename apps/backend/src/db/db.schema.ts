import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type todoDocument = HydratedDocument<TodoMongooseSchema>;
export type userDocument = HydratedDocument<UserMongooseSchema>;

@Schema()
export class TodoMongooseSchema {
  @Prop()
  id?: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

@Schema()
export class UserMongooseSchema {
  @Prop()
  id?: string;
  @Prop()
  username: string;
  @Prop()
  email: string;
}

export const todoMongooseSchema =
  SchemaFactory.createForClass(TodoMongooseSchema);
export const userMongooseSchema =
  SchemaFactory.createForClass(UserMongooseSchema);

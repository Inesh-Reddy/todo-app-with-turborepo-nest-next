import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  todoMongooseSchema,
  TodoMongooseSchema,
  userMongooseSchema,
  UserMongooseSchema,
} from './db.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL') ?? '',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: TodoMongooseSchema.name,
        schema: todoMongooseSchema,
      },
      { name: UserMongooseSchema.name, schema: userMongooseSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DbModule {}

import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TRPCModule } from 'nestjs-trpc';

@Module({
  imports: [
    TodoModule,
    DbModule,
    ConfigModule.forRoot(),
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

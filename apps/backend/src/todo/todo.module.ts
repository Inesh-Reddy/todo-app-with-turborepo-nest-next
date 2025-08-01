import { Module } from '@nestjs/common';
import { TodoRouter } from './todo.router';
import { TodoService } from './todo.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [TodoRouter, TodoService],
})
export class TodoModule {}

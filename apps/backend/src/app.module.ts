import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TRPCModule } from 'nestjs-trpc';
import { WsModule } from './ws/ws.module';
import { PrismaModModule } from './prismamod/prismamod.module';

@Module({
  imports: [
    TodoModule,
    DbModule,
    ConfigModule.forRoot(),
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),
    PrismaModModule,
    WsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { Injectable } from '@nestjs/common';
import { Todo } from 'generated/prisma';
import { PrismaService } from 'src/prismamod/prismamod.initialize';
@WebSocketGateway({ transport: ['websocket'], path: '/ws' })
@Injectable()
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private clients: Set<WebSocket> = new Set();

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

  afterInit() {
    console.log(`WebSocket initialized`);
  }

  async handleConnection(client: WebSocket) {
    this.clients.add(client);
    console.log('Client connected');

    const todos = await this.ptodoModel.todo.findMany();
    client.send(JSON.stringify({ type: 'todos', data: todos }));

    client.on('message', (message: Buffer) => {
      const text = message.toString();
      client.send(`Echo: ${text}`);
    });
  }

  handleDisconnect(client: WebSocket) {
    this.clients.delete(client);
    console.log('Client disconnected');
  }

  async broadcastTodoList() {
    console.log(`broadcasting server`);
    const todos = await this.ptodoModel.todo.findMany();
    const message = JSON.stringify({ type: 'todos', data: todos });

    for (const client of this.clients) {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    }
  }
}

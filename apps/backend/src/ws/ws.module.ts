import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { PrismaService } from 'src/prismamod/prismamod.initialize';
import { PrismaModModule } from 'src/prismamod/prismamod.module';

@Module({
  imports: [PrismaModModule],
  providers: [WsGateway, PrismaService],
})
export class WsModule {}

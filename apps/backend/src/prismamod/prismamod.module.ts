import { Module } from '@nestjs/common';
import { PrismaService } from './prismamod.initialize';
import { PTodoService } from './prismamod.service';
import { PTodoRouter } from './prismamod.router';

@Module({
  exports: [PrismaModModule],
  imports: [],
  providers: [PrismaService, PTodoRouter, PTodoService],
})
export class PrismaModModule {}

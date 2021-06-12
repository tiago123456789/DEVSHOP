import { Module } from '@nestjs/common';
import { HandlerException } from './exceptions/handler.exceptiont';

@Module({
  controllers: [],
  providers: [HandlerException],
})
export class CommomModule {}

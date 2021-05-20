import { Module } from '@nestjs/common';
import { CategoryResolve } from './category.resolve';

@Module({
  controllers: [],
  providers: [CategoryResolve],
})
export class CategoryModule {}

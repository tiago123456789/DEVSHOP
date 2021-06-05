import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductResolver } from './product.resolve';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
//   controllers: [],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}

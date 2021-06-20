import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommomModule } from 'src/commom/commom.module';
import { Brand } from './brand.entity';
import { BrandResolve } from './brand.resolve';
import { BrandService } from './brand.service';

@Module({
    imports: [TypeOrmModule.forFeature([Brand]), CommomModule],
    providers: [BrandService, BrandResolve]
})
export class BrandModule {}

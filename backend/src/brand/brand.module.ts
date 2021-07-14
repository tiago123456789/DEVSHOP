import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommomModule } from 'src/commom/commom.module';
import { Brand } from './brand.entity';
import { BrandResolve } from './brand.resolve';
import { BrandService } from './brand.service';

@Module({
    imports: [TypeOrmModule.forFeature([Brand]), CommomModule, 
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get('JWT_SECRET'),
          }
        },
      }),],
    providers: [BrandService, BrandResolve]
})
export class BrandModule {}

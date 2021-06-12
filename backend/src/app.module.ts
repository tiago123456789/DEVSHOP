import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from "path";
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { ProductModule } from './product/product.module';
import { CommomModule } from './commom/commom.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ProductModule,
    CommomModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        switch(error.extensions.exception.name) {
          case "DataInvalidException":
            return {
              message: error.extensions.exception.response || error.message,
              // @ts-ignore
              statusCode: error.extensions.exception.statusCode || 500,
            };
          default:
            if (error.extensions.exception.status == 400) {
              return {
                message: error.extensions.exception.response.message,
                // @ts-ignore
                statusCode: 400
              };
            }
            return {
              message: "Internal server error",
              // @ts-ignore
              statusCode: error.extensions.exception.statusCode || 500,
            };
        }
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        return {
          type: configService.get("DB_TYPE"),
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_NAME"),
          autoLoadEntities: true,
          synchronize: true,
          logging: configService.get("ENV") == "dev" ? true : false
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

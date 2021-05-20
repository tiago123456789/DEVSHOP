import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from "path";
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CategoryModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

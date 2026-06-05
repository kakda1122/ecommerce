import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { User } from './modules/user/user.entity';
import { Task } from './modules/task/task.entity';
import { Receipt } from './database/entities/receipts.entity';
import { Category } from './modules/category/category.entity';
import { Product } from './modules/product/product.entity';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task, Receipt, Category, Product],
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')], // schema-first
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'), // code-first
      sortSchema: true,
      playground: true,
    }),
    UserModule,
    TaskModule,
    ReceiptsModule,
    NotificationsModule,
    CategoryModule,
    ProductModule,
    GraphqlModule,
  ],
})
export class AppModule {}
//  sets up global providers (e.g., database connections via TypeORM).
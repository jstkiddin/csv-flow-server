import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test-db',
      entities: [__dirname, '/**/*.entity{.ts,.js'],
    }),
    UsersModule,
    TransactionsModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from 'src/db/Transacation.entity';
import { UserEntity } from 'src/db/User.entity';
import { UserTransactionsEntity } from 'src/db/UserTransaction.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenEntity } from 'src/db/RefreshToken.entity';

@Module({
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test-db.sqlite',
      synchronize: true,
      entities: [
        UserEntity,
        UserTransactionsEntity,
        TransactionsEntity,
        RefreshTokenEntity,
      ],
    }),
    UsersModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  exports: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsEntity } from '../../db/Transacxtion.entity';

@Module({
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([TransactionsEntity])],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}

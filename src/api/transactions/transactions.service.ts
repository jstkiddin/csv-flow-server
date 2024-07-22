import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from 'src/db/Transacation.entity';
import { UserTransactionsEntity } from 'src/db/UserTransaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(UserTransactionsEntity)
    private utRepository: Repository<UserTransactionsEntity>,
  ) {}
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from 'src/db/Transacation.entity';
import { UserEntity } from 'src/db/User.entity';
import { UserTransactionsEntity } from 'src/db/UserTransaction.entity';
import { Repository } from 'typeorm';
import { ImportDataDto } from './dtos/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(UserTransactionsEntity)
    private utRepository: Repository<UserTransactionsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async importTransaction(data: ImportDataDto, email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const file = await this.utRepository.save({
      user,
      fileName: data.fileName,
    });

    data.data.forEach(async (record) => {
      await this.transactionsRepository.save({ ...record, dataFile: file });
    });
  }
}

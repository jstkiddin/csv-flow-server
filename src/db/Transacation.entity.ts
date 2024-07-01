import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTransactionsEntity } from './UserTransaction.entity';

@Entity('transactions')
export class TransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column()
  clientName: string;

  @Column()
  amount: string;

  @ManyToOne(
    () => UserTransactionsEntity,
    (dataFile: UserTransactionsEntity) => dataFile.id,
  )
  // @Index()
  @JoinColumn()
  dataFile: UserTransactionsEntity;
}

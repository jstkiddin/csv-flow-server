import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { UserTransactionsEntity } from './UserTransaction.entity';

@Entity('transactions')
export class TransactionsEntity extends BaseEntity {
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
  @JoinColumn()
  dataFile: UserTransactionsEntity;
}

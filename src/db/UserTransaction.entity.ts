import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './User.entity';
import { TransactionsEntity } from './Transacation.entity';
import { BaseEntity } from './Base.entity';

@Entity('user-transaction')
export class UserTransactionsEntity extends BaseEntity {
  @Column()
  fileName: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(
    () => TransactionsEntity,
    (transaction: TransactionsEntity) => transaction.id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  transactions: TransactionsEntity[];
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { TransactionsEntity } from './Transacxtion.entity';

@Entity()
export class UserTransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  @Index()
  @JoinColumn()
  user: UserEntity;

  @OneToMany(
    () => TransactionsEntity,
    (transaction: TransactionsEntity) => transaction.id,
  )
  @Index()
  @JoinColumn()
  transactions: TransactionsEntity[];
}

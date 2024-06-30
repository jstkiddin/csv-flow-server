import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserTransactionsEntity } from './UserTransaction.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    () => UserTransactionsEntity,
    (dataFile: UserTransactionsEntity) => dataFile.id,
  )
  @Index()
  @JoinColumn()
  dataFile: UserTransactionsEntity;
}

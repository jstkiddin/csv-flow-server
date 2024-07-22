import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { RefreshTokenEntity } from './RefreshToken.entity';
import { UserTransactionsEntity } from './UserTransaction.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    () => UserTransactionsEntity,
    (dataFile: UserTransactionsEntity) => dataFile.id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  dataFile: UserTransactionsEntity[];

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshTokens: RefreshTokenEntity[];
}

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserEntity } from './User.entity';

@Entity({
  name: 'refreshTokens',
})
export class RefreshTokenEntity extends BaseEntity {
  @Column()
  refreshToken: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  user: UserEntity;

  @Column({ nullable: true })
  expiresAt: Date;
}

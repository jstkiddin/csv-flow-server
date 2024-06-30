import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../db/User.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}

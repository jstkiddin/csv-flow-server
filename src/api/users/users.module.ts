import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserTransactionsEntity } from 'src/db/UserTransaction.entity';
import { UserEntity } from '../../db/User.entity';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenEntity } from 'src/db/RefreshToken.entity';

@Module({
  providers: [UserService, JwtStrategy],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}

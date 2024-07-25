import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/User.entity';
import { Repository } from 'typeorm';
import { UserCredentialsDto, UserDto } from './dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from 'src/db/RefreshToken.entity';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private refreshRepository: Repository<RefreshTokenEntity>,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param createUserDto : {email: string, password:string}
   * @returns token and user data -- email and id
   */

  async register(createUserDto: UserCredentialsDto): Promise<{
    token: string;
    user: UserDto;
  }> {
    const { password, email } = createUserDto;

    // User check
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email is already associated with an existing account.',
        HttpStatus.CONFLICT,
      );
    }

    // User saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = hashedPassword;

    const user = await this.userRepository.save(newUser);

    const payload = {
      userId: user.id,
      sub: {
        email: user.email,
        pass: password,
      },
    };

    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);

    await this.refreshRepository.save({
      userId: user.id,
      refreshToken,
      expiresAt: moment().add(30, 'days').format('YYYY-MM-DD'),
    });

    return { token, user: { id: user.id, email: user.email } };
  }

  /**
   *
   * @param loginUserDto : {email: string, password:string}
   * @returns token and user data -- email and id
   */
  async login(loginUserDto: UserCredentialsDto): Promise<{
    token: string;
    user: UserDto;
  }> {
    const { email, password } = loginUserDto;

    const user = await this.validateUser({ email, password });

    const payload = {
      userId: user.id,
      sub: {
        pass: password,
        email: user.email,
      },
    };

    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);

    await this.refreshRepository.save({
      userId: user.id,
      refreshToken,
      expiresAt: moment().add(30, 'days').format('YYYY-MM-DD'),
    });

    const data = await this.fetchCurrentUser(user.id);

    return { token, user: { id: data.id, email: data.email } };
  }

  /**
   *
   * @param id user id
   * @returns
   */
  async fetchCurrentUser(id: string) {
    return await this.userRepository.findOne({
      select: { id: true, email: true },
      where: { id },
    });
  }

  async validateUser(credentials: UserCredentialsDto) {
    const { password, email } = credentials;

    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Password is not valid', HttpStatus.CONFLICT);
    }

    return { ...user };
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { GetToken } from './decorators/get-token.decorator';
import { UserCredentialsDto, UserDto } from './dtos/users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() createUserDto: UserCredentialsDto,
  ): Promise<{ token: string; user: UserDto }> {
    return await this.userService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginUserDto: UserCredentialsDto,
  ): Promise<{ token: string; user: UserDto }> {
    return await this.userService.login(loginUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@GetToken() email: string) {
    return this.userService.fetchCurrentUser(email);
  }
}

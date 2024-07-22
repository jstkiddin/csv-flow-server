import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const jwtService: JwtService = new JwtService();
    const [, token] = authHeader.split(' ');

    return jwtService.decode(token).id;
  },
);

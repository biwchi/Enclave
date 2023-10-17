import { UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export type JwtUser =
  | {
      id: string;
      email: string;
      iat: number;
      exp: number;
    }
  | undefined;

export const ExtractUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContextHost) => {
    const jwtService = new JwtService();
    const req: Request = ctx.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) return false;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer === 'Bearer' && token) {
      try {
        const user = jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
        req.user = user;
        return user;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  },
);

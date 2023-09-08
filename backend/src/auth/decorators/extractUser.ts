import { createParamDecorator } from '@nestjs/common';
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

    if (!authHeader) return;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer === 'Bearer' && token) {
      const user = jwtService.verify(token, { secret: process.env.JWT_SECRET });

      if (!user) return;

      req.user = user;
      return user;
    }
  },
);

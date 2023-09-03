import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from 'src/types/user';

@Injectable()
export class JwtStragety extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      usernameField: 'email',
    });
  }

  async validate(payload: IUser) {
    const user = {
      email: payload.email,
      id: payload.id,
      username: payload.username,
    };
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../auth.model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // BUG: !
  // async validate({ email }): Promise<Pick<User, 'email'>> {
  //   return email;
  // }
  //
  // async validate({ email }: { email: string }): Promise<Pick<User, 'email'>> {
  //   return { email };
  // }
  // async validate(payload: any): Promise<Pick<User, 'email' | '_id'>> {
  //   const { email, _id } = payload;
  //   return { email, _id };
  // }
  async validate(payload: any): Promise<Partial<User>> {
    // const { email, _id } = payload;
    const { email, _id } = payload;
    // console.log(payload, 'payload');
    const user: Partial<User> = { email };

    if (_id) {
      user['_id' as keyof Partial<User>] = _id;
    }

    return user;
  }
}

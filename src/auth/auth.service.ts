// TODO: move create and find services to users
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, User } from './auth.model/user.model';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(authDto: AuthDto) {
    try {
      const salt = await genSalt(10);

      // const newUser = new this.userModel(authDto);
      const newUser = new this.userModel({
        email: authDto.login,
        passwordHash: await hash(authDto.password, salt),
      });

      const createdUser = await newUser.save();

      return createdUser;
    } catch (error: any) {
      if (
        error.message &&
        typeof error.message === 'string' &&
        error.message.startsWith('E11000')
      ) {
        // console.log('catched!!!');
        throw new HttpException('користувач з таким логіном вже існує', HttpStatus.CONFLICT);
      }
      // console.log(error.message);
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException('користувача не знайдено');
    }
    if (!user.passwordHash) {
      throw new HttpException('відсутні дані паролю', HttpStatus.NOT_FOUND);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('пароль невірний');
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, User } from './auth.model/auth.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<AuthDocument>) {}

  async createUser({ email, password }: { email: string; password: string }) {
    try {
      const newUser = new this.userModel({ email, password });

      const createdUser = await newUser.save();

      return createdUser;
    } catch (error: any) {
      if (
        error.message &&
        typeof error.message === 'string' &&
        error.message.startsWith('E11000')
      ) {
        // console.log('catched!!!');
        throw new HttpException('duplicate login', HttpStatus.CONFLICT);
      }
      // console.log(error.message);
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    return this.userModel.findOne({ email, password });
  }
}

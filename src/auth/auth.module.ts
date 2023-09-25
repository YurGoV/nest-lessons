import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema, User } from './auth.model/auth.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: AuthSchema }])],
  providers: [AuthService],
})
export class AuthModule {}

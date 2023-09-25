import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

// import { CreateUserDto } from 'src/users/dto/create.user.dto';
// import { GetUserDto } from 'src/users/dto/get.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  async create(@Body() createUserDto: AuthDto) {
    return await this.authService.createUser(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: AuthDto) {
    return await this.authService.login(loginUserDto);
  }
}

import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

// import { CreateUserDto } from 'src/users/dto/create.user.dto';
// import { GetUserDto } from 'src/users/dto/get.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() createUserDto: AuthDto) {
    return await this.authService.createUser(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email, _id } = await this.authService.validateUser(login, password);
    // console.log(email, _id, 'in auth.ctrl');
    return await this.authService.login(email, _id);
  }
}

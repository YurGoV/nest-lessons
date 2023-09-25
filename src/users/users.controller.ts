import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
  @Get('get-all')
  async get(@Body() getUserDto: GetUserDto) {
    return await this.usersService.getAll(getUserDto);
    // console.log(t);
    // return t;
  }
}

// import { ProductModel } from './product.model/product.model';
// import { FindProductDto } from './dto/findProduct.dto';

// @Controller('product')
// export class ProductController {
//   @Post('create')
//   async create(@Body() dto: Omit<ProductModel, '_id'>) {}
//
//   @Get(':id')
//   async get(@Param('id') id: string) {}
//
//   @Delete(':id')
//   async delete(@Param('id') id: string) {}
//
//   @Patch(':id')
//   async patch(@Param('id') id: string, @Body() dto: ProductModel) {}
//
//   @HttpCode(200)
//   @Post()
//   async find(@Body() dto: FindProductDto) {}
// }

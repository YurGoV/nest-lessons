import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FindProductDto } from './dto/findProduct.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('get-by-category')
  async getByCategory(@Body() findProductDto: FindProductDto) {
    return this.productService.getByCategory(findProductDto);
  }

  // @Get(':id')
  // async get(@Param('id') id: string) {}
  //
  // TODO: delete
  //
  // @Delete(':id')
  // async delete(@Param('id') id: string) {}

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: ProductModel) {}

  // @HttpCode(200)
  // @Post()
  // async find(@Body() dto: FindProductDto) {}
}

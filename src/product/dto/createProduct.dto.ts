import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: 'product_title_string', description: 'the product title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 500, description: 'the product price' })
  readonly price: number;

  @IsString()
  @ApiProperty({ example: ['category_exapmle'], description: 'the product category' })
  readonly categories: string[];

  @IsNumber()
  @ApiProperty({ example: 'description example', description: 'the product description' })
  readonly description: string;
}

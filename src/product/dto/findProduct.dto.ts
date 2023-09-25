import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindProductDto {
  @IsString()
  @ApiProperty({ example: 'category_exapmle', description: 'the product category' })
  readonly category: string;

  @IsNumber()
  @ApiProperty({ example: 5, description: 'number of recived products' })
  limit: number;
}

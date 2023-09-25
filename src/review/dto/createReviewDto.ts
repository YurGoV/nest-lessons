import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsString()
  @ApiProperty({ example: 'review_name', description: 'the review name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'review_title', description: 'the review title' })
  readonly title: number;

  @IsNumber()
  @ApiProperty({ example: 'description example', description: 'the review description' })
  readonly description: string;

  @IsString()
  @ApiProperty({ example: 200, description: 'the review rating' })
  readonly rating: number;

  @IsString()
  @ApiProperty({ example: '65115f916c2c37b1bd0852e1', description: 'the review product id' })
  readonly productId: string;
}

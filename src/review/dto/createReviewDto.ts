import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsString()
  @ApiProperty({ example: 'review_name', description: 'the review name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'review_title', description: 'the review title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'description example', description: 'the review description' })
  readonly description: string;

  @Max(5, { message: 'Значення рейтингу не може бути більше за 1' })
  @Min(1, { message: 'Значення рейтингу не може бути менше за 1' })
  @IsNumber()
  @ApiProperty({ example: 5, description: 'the review rating' })
  readonly rating: number;

  @IsString()
  @ApiProperty({ example: '65115f916c2c37b1bd0852e1', description: 'the review product id' })
  readonly productId: string;
}

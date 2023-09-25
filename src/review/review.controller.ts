import { Body, Controller, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReviewDto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviwService: ReviewService) {}
  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviwService.create(createReviewDto);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {}
  //
  // @Get('byProduct/:productId')
  // async getByProduct(@Param('productId') productId: string) {}
}

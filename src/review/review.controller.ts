import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/createReviewDto';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guards/jwtGuard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviwService: ReviewService) {}

  @ApiBearerAuth() //TODO: remove
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviwService.create(createReviewDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.reviwService.delete(id);
  }

  @Get('byProductId/:productId')
  async getByProductId(@Param('productId') productId: string) {
    return await this.reviwService.getByProductId(productId);
  }
}

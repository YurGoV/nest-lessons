import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.model/review.model';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    TelegramModule,
  ],
  providers: [ReviewService],
})
export class ReviewModule {}

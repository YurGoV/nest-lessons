import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/createReviewDto';
import { AuthDocument, Review } from './review.model/review.model';

// import { AuthDocument, Product } from './product.model/product.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<AuthDocument>) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const newReview = new this.reviewModel(createReviewDto);
      const createdReview = await newReview.save();
      return createdReview;
    } catch (error: any) {
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
      if (!deletedReview) {
        throw new HttpException(`Review not found`, HttpStatus.NOT_FOUND);
      }
      return deletedReview;
    } catch (error: any) {
      throw new HttpException(`Review not found`, HttpStatus.NOT_FOUND);
      // throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByProductId(productId: string) {
    try {
      const findedReviews = await this.reviewModel.find({ productId });
      return findedReviews;
    } catch (error: any) {
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, Product } from './product.model/product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<AuthDocument>) {}

  async create({
    title,
    price,
    categories,
    description,
  }: {
    title: string;
    price: number;
    categories: string[];
    description: string;
  }) {
    try {
      const newProduct = new this.productModel({ title, price, categories, description });
      const createdProduct = await newProduct.save();
      return createdProduct;
    } catch (error: any) {
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByCategory({ category }: { category: string }) {
    try {
      const result = await this.productModel.find({ categories: category });
      // console.log(result);
      return result;
      // return this.productModel.findOne({ category });
    } catch (error: any) {
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

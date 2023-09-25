import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.model/product.model';

@Module({
  controllers: [ProductController],
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  providers: [ProductService],
})
export class ProductModule {}

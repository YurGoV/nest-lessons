import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Product } from 'src/product/product.model/product.model';

export type AuthDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop()
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: mongooseSchema.Types.ObjectId;
  //TODO: check!
  // productId: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

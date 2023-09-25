import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';

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
  productId: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

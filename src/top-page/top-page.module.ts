import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './top-page.model/top-page.model';

@Module({
  controllers: [TopPageController],
  imports: [MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }])],
  providers: [TopPageService],
})
export class TopPageModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, TopPage } from './top-page.model/top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/createTopPage.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPage.name) private topPageModel: Model<AuthDocument>) {}

  async create(createTopPageDto: CreateTopPageDto) {
    try {
      const newTopPage = new this.topPageModel(createTopPageDto);
      const createdTopPage = await newTopPage.save();
      return createdTopPage;
    } catch (error: any) {
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

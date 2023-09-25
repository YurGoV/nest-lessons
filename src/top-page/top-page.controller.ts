import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
// import { TopPageModel } from './top-page.model/top-page.model';
// import { FindTopPageDto } from './dto/findTopPage.dto';
// import { ConfigService } from '@nestjs/config';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/createTopPage.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() createTopPageDto: CreateTopPageDto) {
    return await this.topPageService.create(createTopPageDto);
  }

  // @Get(':id')
  // async get(@Param('id') id: string) {
  // }
  //
  // @Delete(':id')
  // async delete(@Param('id') id: string) {}
  //
  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}
  //
  // @HttpCode(200)
  // @Post()
  // async find(@Body() dto: FindTopPageDto) {}
}

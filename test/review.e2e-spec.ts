import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/createReviewDto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Header',
  description: 'Description ',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/delete/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/delete/' + createdId)
      .expect(200);
  });

  it('/review/delete/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/delete/' + new Types.ObjectId().toHexString())
      .expect(404);
  });

  afterAll(() => {
    disconnect();
  });
});

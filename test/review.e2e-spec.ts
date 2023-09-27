import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/createReviewDto';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const loginDto: AuthDto = {
  login: 'example_email',
  password: 'example_password',
};

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Header',
  description: 'Description ',
  rating: 4,
  productId,
};

let token: string;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  // TODO: add tests for login
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // const authRes = await request(app.getHttpServer().post('/auth/login').send(loginDto));
    const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
    token = body.access_token;
    // console.log(token, 'token');
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', 'Bearer ' + token)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', 'Bearer ' + token)
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body);
        // createdId = body._id;
        // expect(createdId).toBeDefined();
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

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expression } from '@babel/template';
import * as session from 'express-session';
import * as bodyParser from 'body-Parser';
import { Request, Response } from 'express';
import { Dispatcher } from './common/filters/DispatchError';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.userStaticAssets(`${__dirname}/assets`);
  // app.use(bodyParser.json({limit: '50mb'}));
  // app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  app.useGlobalFilters(new Dispatcher());
  app.use(session({secret: 'TheHashChain', cookie: {maxAge: 300000}}));
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  await app.listen(3000);
}

bootstrap();

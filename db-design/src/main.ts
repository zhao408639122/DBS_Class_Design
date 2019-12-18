import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expression } from '@babel/template';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({secret: 'TheHashChain', cookie: {maxAge: 300000}}));
  await app.listen(3000);
}

bootstrap();

import { NestModule, Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
// import { Cors } from './lib/cors.middleware';
import { LoginController } from './login/login.controller';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345qwert',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor (private readonly connection: Connection) {} 
}

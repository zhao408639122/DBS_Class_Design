import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { DepsModule } from './deps/deps.module';
import { RepusModule } from './repus/repus.module';


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
    UsersModule,
    AuthModule,
    CourseModule,
    DepsModule,
    RepusModule,
  ],
  controllers : [AppController],
  providers : [AppService]
})
export class AppModule {
  constructor (private readonly connection: Connection) {} 
}

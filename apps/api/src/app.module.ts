import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // 또는 사용하실 DB
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발환경에서만 true로 설정
    }),
    ScheduleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

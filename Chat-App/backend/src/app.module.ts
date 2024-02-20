import { MiddlewareConsumer, Module, ValidationPipe, type NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from "src/db/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { CustomHttpExceptionFilter } from './Exceptions/http.exception.filter';

import { Log } from './db/entities/log.entity';


import { LogsModule } from './logs/logs.module';
import { loggingInterceptor } from './Interceptors/logging.interceptor';
import { LogsService } from './logs/logs.service';
import { UserFetcherMiddleware } from './middlewares/user-fetcher.middleware';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './gateway/chat.gateway';
import { Chat } from './db/entities/chat.entity';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


// import { LoggerModule } from './logger/logger.module';






@Module({
  imports:
    [

      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        entities: [User, Log, Chat],

      }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'),
      }),
      UserModule,
      AuthModule,

      LogsModule,
      ChatModule


    ],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: LoggingInteceptor },
    { provide: APP_INTERCEPTOR, useClass: loggingInterceptor },
    { provide: APP_FILTER, useClass: CustomHttpExceptionFilter },
    JwtStrategy,
    JwtService, ChatGateway,

  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserFetcherMiddleware)
      .forRoutes('*');
  }
}


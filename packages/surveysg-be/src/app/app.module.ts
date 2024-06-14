import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from '@/be-common/modules/database';
import GovernmentAgencyEntity from '@/common/entities/GovernmentAgencyEntity';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

import RequestLoggerMiddleware from '~/middlewares/request-logger.middleware';
import AuthModule from '~/modules/auth';
import GovernmentAgencyModule from '~/modules/government-agency';
import UserModule from '~/modules/user';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../../.env' }),
    DatabaseModule({ entities: [GovernmentAgencyEntity, SurveyUserEntity] }),
    GovernmentAgencyModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

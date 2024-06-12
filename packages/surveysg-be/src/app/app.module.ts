import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from '@/be-common/modules/database';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

import GovernmentAgencyEntity from '~/entities/GovernmentAgency';
import AuthModule from '~/modules/auth';
import GovernmentAgencyModule from '~/modules/government-agency';
import UserModule from '~/modules/user/user.module';

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
export default class AppModule {}

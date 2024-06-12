import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from '@/be-common/modules/database';

import GovernmentAgencyModule from '~/modules/government-agency';
import AuthModule from '~/modules/auth';
import GovernmentAgency from '~/entities/GovernmentAgency';

import AppService from './app.service';
import AppController from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../../.env' }),
    DatabaseModule({ entities: [GovernmentAgency] }),
    GovernmentAgencyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}

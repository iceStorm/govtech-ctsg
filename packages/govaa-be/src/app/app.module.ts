import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from '@/be-common/modules/database/database.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../../.env' }),
    DatabaseModule({ entities: [] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}

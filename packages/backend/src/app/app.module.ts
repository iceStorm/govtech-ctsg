import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from '~/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import GovaaModule from '~/modules/govaa/govaa.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../../../../.env' }), DatabaseModule, GovaaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from '@/be-common/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import GovernmentAgencyModule from '~/modules/government-agency';
import AuthModule from '~/modules/auth';
import GovernmentAgency from '~/entities/GovernmentAgency';

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
export class AppModule {}

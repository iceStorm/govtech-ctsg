import { Module } from '@nestjs/common';

import GovernmentAgencyController from './government-agency.controller';
import GovernmentAgencyRepository from './government-agency.repository';

@Module({
  controllers: [GovernmentAgencyController],
  providers: [GovernmentAgencyRepository],
})
export default class GovernmentAgencyModule {}

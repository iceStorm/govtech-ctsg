import { Module } from '@nestjs/common';
import GovernmentAgencyController from './government-agency.controller';

@Module({
  controllers: [GovernmentAgencyController],
})
export default class GovernmentAgencyModule {}

import { Module, OnApplicationBootstrap } from '@nestjs/common';

import GovernmentAgencyRepository from '../government-agency/government-agency.repository';

import SeedService from './seed.service';

@Module({
  providers: [GovernmentAgencyRepository, SeedService],
})
export default class SeedModule implements OnApplicationBootstrap {
  constructor(private seedService: SeedService) {}

  async onApplicationBootstrap() {
    await this.seedService.seedGovernmentAgencies();
  }
}

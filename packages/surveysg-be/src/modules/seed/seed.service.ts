import { Injectable, Logger } from '@nestjs/common';

import GovernmentAgencyRepository from '../government-agency/government-agency.repository';

import governmentAgencySeeds from './data/government-agency.seed';

@Injectable()
export default class SeedService {
  logger = new Logger('SeedService');

  constructor(private readonly gaRepo: GovernmentAgencyRepository) {}

  async seedGovernmentAgencies() {
    const isSeeded = (await this.gaRepo.count()) > 0;
    if (isSeeded) {
      this.logger.log('Government agencies already seeded.');
      return;
    }

    const entities = governmentAgencySeeds.map((item) => this.gaRepo.create({ name: item.name }));

    try {
      await this.gaRepo.save(entities);

      this.logger.log('Government agencies seeded:', entities.length, 'items seeded.');
    } catch (error) {
      this.logger.error('Error seeding government agencies:', error);
    }
  }
}

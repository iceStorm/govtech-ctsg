import { Controller, Get } from '@nestjs/common';

import GovernmentAgencyRepository from './government-agency.repository';

@Controller('government-agencies')
export default class GovernmentAgencyController {
  constructor(private readonly repo: GovernmentAgencyRepository) {}

  @Get()
  getGovernmentAgencies() {
    return this.repo.find();
  }
}

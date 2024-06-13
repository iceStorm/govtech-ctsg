import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import GovernmentAgencyRepository from './government-agency.repository';

@ApiTags('government-agencies')
@Controller('government-agencies')
export default class GovernmentAgencyController {
  constructor(private readonly repo: GovernmentAgencyRepository) {}

  @Get()
  getGovernmentAgencies() {
    return this.repo.find();
  }
}

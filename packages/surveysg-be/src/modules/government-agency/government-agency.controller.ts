import { Controller, Get } from '@nestjs/common';

import GovernmentAgency from '~/entities/GovernmentAgency';

@Controller('government-agencies')
export default class GovernmentAgencyController {
  @Get()
  getGovernmentAgencies() {
    return GovernmentAgency.find();
  }
}

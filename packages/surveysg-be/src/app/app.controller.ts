import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import GovernmentAgency from '~/entities/GovernmentAgency';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  heartBeat() {
    return this.appService.getData();
  }

  @Get('/government-agencies')
  getGovernmentAgencies() {
    return GovernmentAgency.find();
  }
}

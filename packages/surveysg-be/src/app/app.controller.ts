import { Controller, Get } from '@nestjs/common';

import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  heartBeat() {
    return this.appService.getData();
  }
}

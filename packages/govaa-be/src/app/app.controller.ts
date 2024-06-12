import { Body, Controller, Post } from '@nestjs/common';

import { GovaaLoginPayload, GovaaLoginResponse } from '~/dtos/govaa.dto';

import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  authenticate(@Body() credentials: GovaaLoginPayload): Promise<GovaaLoginResponse> {
    return this.appService.authenticate(credentials);
  }
}

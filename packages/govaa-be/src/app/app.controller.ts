import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { GovaaLoginPayload, GovaaLoginResponse } from '~/dtos/govaa.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  authenticate(@Body() credentials: GovaaLoginPayload): Promise<GovaaLoginResponse> {
    return this.appService.authenticate(credentials);
  }
}

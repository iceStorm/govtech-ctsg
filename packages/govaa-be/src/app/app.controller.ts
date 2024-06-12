import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { GovaaLoginPayload, GovaaLoginResponse } from '~/dtos/govaa.dto';

import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  heartbeat() {
    return 'Hello world';
  }

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  authenticate(@Body() credentials: GovaaLoginPayload): Promise<GovaaLoginResponse> {
    return this.appService.authenticate(credentials);
  }
}

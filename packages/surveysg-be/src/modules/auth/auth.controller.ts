import { Body, Controller, Post } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';

import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginPayload) {
    return this.authService.login(payload);
  }
}

import { Body, Controller, Post, Query } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import { GovaaLoginAction } from '@/common/models/GovaaLoginActionQuery';

import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginPayload, @Query('action') action: GovaaLoginAction) {
    return this.authService.login(payload, action);
  }

  @Post('sign-up')
  signUp(@Body() payload: SurveyUserEntity) {
    return this.authService.signUp(payload);
  }
}

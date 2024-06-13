import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

import AuthGuard from '~/guards/auth.guard';

import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() payload: LoginPayload) {
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard)
  @Post('sign-up')
  signUp(@Body() payload: SurveyUserEntity) {
    return this.authService.signUp(payload);
  }
}

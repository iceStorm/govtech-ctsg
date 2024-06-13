import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import LoginPayload from '@/common/dtos/login-payload.dto';
import ITokenInfo from '@/common/models/ITokenInfo';

import TokenInfo from '~/decorators/request-user.decorator';
import AuthGuard from '~/guards/auth.guard';

import AuthService from './auth.service';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() payload: LoginPayload) {
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refreshToken(@TokenInfo() tokenInfo: ITokenInfo) {
    return this.authService.generateTokens(tokenInfo.email, tokenInfo.name);
  }
}

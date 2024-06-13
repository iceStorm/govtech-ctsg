import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import ITokenInfo from '@/common/models/ITokenInfo';

import TokenInfo from '~/decorators/request-user.decorator';
import AuthGuard from '~/guards/auth.guard';

import UserService from './user.service';

@ApiTags('users')
@Controller('users')
export default class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getCurrentUserProfile(@TokenInfo() token: ITokenInfo) {
    return this.userService.getCurrentUserProfile(token.email);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createAccount(@TokenInfo() token: ITokenInfo, @Body() payload: SurveyUserEntity) {
    return this.userService.createAccount(token, payload);
  }
}

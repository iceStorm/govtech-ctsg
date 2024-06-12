import { Controller, Get, UseGuards } from '@nestjs/common';

import TokenInfo from '~/decorators/request-user.decorator';
import AuthGuard from '~/guards/auth.guard';
import ITokenInfo from '~/models/ITokenInfo';

import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getCurrentUserProfile(@TokenInfo() token: ITokenInfo) {
    return this.userService.getCurrentUserProfile(token.email);
  }
}

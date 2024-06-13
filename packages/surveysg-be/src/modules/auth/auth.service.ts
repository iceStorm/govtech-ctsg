import { ForbiddenException, Injectable } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';

import govaaApiClient from '~/api';
import { generateTokens } from '~/utils/jwt.util';

import UserRepository from '../user/user.repository';

@Injectable()
export default class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(credentials: LoginPayload) {
    const govaaLoginResponse = await govaaApiClient.login({ body: credentials });

    if (govaaLoginResponse.status !== 200) {
      throw new ForbiddenException(govaaLoginResponse.body);
    }

    const surveyUser = await this.userRepo.findByEmail(credentials.email);

    return generateTokens({
      email: credentials.email,
      name: govaaLoginResponse.body.name,
      isRegistered: !!surveyUser,
    });
  }
}

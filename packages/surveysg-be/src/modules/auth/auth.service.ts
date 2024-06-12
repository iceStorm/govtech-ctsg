import { ForbiddenException, Injectable } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';

import govaaApiClient from '~/api';

@Injectable()
export default class AuthService {
  async login(credentials: LoginPayload) {
    const govaaLoginResponse = await govaaApiClient.login({ body: credentials });

    if (govaaLoginResponse.status !== 200) {
      throw new ForbiddenException(govaaLoginResponse.body);
    }
  }
}

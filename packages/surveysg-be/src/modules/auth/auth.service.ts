import { ForbiddenException, Injectable } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

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

    return generateTokens({ email: credentials.email, name: govaaLoginResponse.body.name });
  }

  async signUp(payload: SurveyUserEntity) {
    const surveyUser = await this.userRepo.findByEmail(payload.email);

    if (surveyUser) {
      throw new ForbiddenException(
        `User with email ${surveyUser.email} already exists in SurveySG.`,
      );
    }

    return this.userRepo.create(payload);
  }
}

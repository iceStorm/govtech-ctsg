import { ForbiddenException, Injectable } from '@nestjs/common';

import LoginPayload from '@/common/dtos/login-payload.dto';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import { GovaaLoginAction } from '@/common/models/GovaaLoginActionQuery';

import govaaApiClient from '~/api';
import { generateTokens } from '~/utils/jwt.util';

import UserRepository from '../user/user.repository';

@Injectable()
export default class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(credentials: LoginPayload, action: GovaaLoginAction) {
    const govaaLoginResponse = await govaaApiClient.login({ body: credentials });

    if (govaaLoginResponse.status !== 200) {
      throw new ForbiddenException(govaaLoginResponse.body);
    }

    const surveyUser = await this.userRepo.findByEmail(credentials.email);

    switch (action) {
      case GovaaLoginAction.SURVEY_LOGIN: {
        if (!surveyUser) {
          throw new ForbiddenException(
            'User not registered in SurveySG. Kindly cerate an account first',
          );
        }

        return generateTokens({ email: surveyUser.email });
      }

      case GovaaLoginAction.SURVEY_CREATE_ACCOUNT: {
        if (surveyUser) {
          throw new ForbiddenException(
            `User with email ${surveyUser.email} already exists in SurveySG.`,
          );
        }

        return { name: govaaLoginResponse.body.name, email: credentials.email };
      }

      default:
        return undefined;
    }
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

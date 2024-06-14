import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import ForeignKeys from '@/common/constants/ForeignKeys';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import ITokenInfo from '@/common/models/ITokenInfo';

import UserRepository from './user.repository';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getCurrentUserProfile(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('SurveySG user not found. Have you created an account?');
    }

    return user;
  }

  async createAccount(tokenInfo: ITokenInfo, payload: SurveyUserEntity) {
    // ensure payload's email is equals to the authenticated user's email
    if (tokenInfo.email !== payload.govaaEmail) {
      throw new BadRequestException(
        'Registration email does not match with the authenticated GOVAA user.',
      );
    }

    // ensure payload's name is equals to the authenticated user's name
    if (tokenInfo.name !== payload.name) {
      throw new BadRequestException(
        'Registration name does not match with the authenticated GOVAA user.',
      );
    }

    const surveyUser = await this.userRepository.findByEmail(payload.govaaEmail);
    if (surveyUser) {
      throw new ConflictException(`You have already created SurveySG account.`);
    }

    try {
      const newUser = this.userRepository.create(payload);
      await this.userRepository.save(newUser);
    } catch (error) {
      // check agency integrity constraint
      if (error.message.includes(ForeignKeys.USER__AGENCY)) {
        throw new BadRequestException(
          `Invalid agency name. Please refer to the list of government agencies.`,
        );
      }

      throw error;
    }
  }
}

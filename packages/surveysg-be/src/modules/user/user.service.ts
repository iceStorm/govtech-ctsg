import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
      throw new ForbiddenException(
        'Registration name does not match with the authenticated GOVAA user.',
      );
    }

    const surveyUser = await this.userRepository.findByEmail(payload.govaaEmail);

    if (surveyUser) {
      throw new ConflictException(`You have already created SurveySG account.`);
    }

    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }
}

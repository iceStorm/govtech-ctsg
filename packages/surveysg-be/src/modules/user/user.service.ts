import { Injectable, NotFoundException } from '@nestjs/common';

import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

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

  createAccount(payload: SurveyUserEntity) {
    throw new Error('Method not implemented.');
  }
}

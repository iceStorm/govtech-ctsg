import { Injectable, NotFoundException } from '@nestjs/common';

import UserRepository from './user.repository';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getCurrentUserProfile(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

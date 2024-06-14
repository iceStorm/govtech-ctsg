import { ForbiddenException, Injectable } from '@nestjs/common';

import { GovaaLoginEntity } from '~/dtos/govaa.dto';
import UserRepository from '~/repositories/user.repository';
import { verifyPassword } from '~/utils/hash.util';

@Injectable()
export default class AppService {
  constructor(private readonly userRepo: UserRepository) {}

  async authenticate(credentials: GovaaLoginEntity) {
    const { email, password } = credentials;

    const foundUser = await this.userRepo.findOneBy({ email });
    if (!foundUser) {
      throw new ForbiddenException('Email not exists');
    }

    const isPasswordCorrect = await verifyPassword(password, foundUser.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Password not correct');
    }

    return { name: foundUser.name };
  }
}

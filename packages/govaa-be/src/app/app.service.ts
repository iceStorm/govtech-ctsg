import { ForbiddenException, Injectable } from '@nestjs/common';

import { GovaaUser, GovaaLoginPayload } from '~/dtos/govaa.dto';

const mockUsers: GovaaUser[] = [
  {
    name: 'Anh Tuan',
    email: 'tuanna@ncs-sdc.com',
    password: '12345',
  },
];

@Injectable()
export default class AppService {
  async authenticate(credentials: GovaaLoginPayload) {
    const { email, password } = credentials;

    const foundUser = mockUsers.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      throw new ForbiddenException('Email or password is incorrect');
    }

    return { name: foundUser.name };
  }
}

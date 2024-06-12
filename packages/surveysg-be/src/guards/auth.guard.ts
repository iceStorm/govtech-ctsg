import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import verifyToken from '~/utils/jwt.util';

@Injectable()
export default class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const jwtToken = request.headers.authorization?.split('Bearer ')[1];
    if (!jwtToken) {
      throw new UnauthorizedException('Authentication token missing');
    }

    const tokenInfo = await verifyToken(jwtToken);
    request.tokenInfo = tokenInfo;

    return true;
  }
}

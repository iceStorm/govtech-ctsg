import { UnauthorizedException } from '@nestjs/common';
import { jwtVerify } from 'jose';

import { TokenPayload } from '~/models/ITokenInfo';

export default async function verifyToken(token: string) {
  try {
    const decoded = await jwtVerify<TokenPayload>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    return decoded.payload;
  } catch (error) {
    throw new UnauthorizedException(error.message ?? 'Invalid token');
  }
}

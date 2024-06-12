import { UnauthorizedException } from '@nestjs/common';
import { SignJWT, jwtVerify } from 'jose';

import { TokenPayload } from '~/models/ITokenInfo';

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
const jwtAccessExpiration = parseInt(process.env.JWT_ACCESS_EXPIRATION);
const jwtRefreshExpiration = parseInt(process.env.JWT_REFRESH_EXPIRATION);

export default async function verifyToken(token: string) {
  try {
    const decoded = await jwtVerify<TokenPayload>(token, jwtSecret);

    return decoded.payload;
  } catch (error) {
    throw new UnauthorizedException(error.message ?? 'Invalid token');
  }
}

export async function generateTokens(payload: TokenPayload) {
  const signToken = (expiry: number) =>
    new SignJWT(payload).setExpirationTime(expiry).sign(jwtSecret);

  const accessToken = await signToken(jwtAccessExpiration);
  const refreshToken = await signToken(jwtRefreshExpiration);

  return { accessToken, refreshToken };
}

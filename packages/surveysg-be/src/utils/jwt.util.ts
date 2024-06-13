import { UnauthorizedException } from '@nestjs/common';
import { addSeconds } from 'date-fns';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';

import { TokenPayload } from '@/common/models/ITokenInfo';

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
  const signToken = (expiryInSeconds: number) =>
    new SignJWT(payload)
      .setExpirationTime(addSeconds(new Date(), expiryInSeconds))
      .setProtectedHeader({ alg: 'HS256' })
      .sign(jwtSecret);

  const accessToken = await signToken(jwtAccessExpiration);
  const refreshToken = await signToken(jwtRefreshExpiration);

  return { accessToken, refreshToken };
}

export const isTokenValid = (token: string): boolean => {
  const { exp } = decodeJwt(token);

  if (!exp) {
    return false;
  }

  const differenceFromNow = exp - Date.now() / 1000;

  console.log('differenceFromNow', differenceFromNow);

  return differenceFromNow > 0;
};

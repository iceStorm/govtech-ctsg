import { decodeJwt } from 'jose';

import { TokenPayload } from '@/common/models/ITokenInfo';

export default function isTokenValid(token: string): boolean {
  const { exp } = decodeJwt(token);

  if (!exp) {
    return false;
  }

  const differenceFromNow = exp - Date.now() / 1000;

  console.log('differenceFromNow', differenceFromNow);

  return differenceFromNow > 0;
}

export function decodeJwtToken(token: string) {
  try {
    return decodeJwt<TokenPayload>(token);
  } catch (error) {
    console.log('decodeJwtToken exception:', error);

    return undefined;
  }
}

import { differenceInSeconds } from 'date-fns';
import { decodeJwt } from 'jose';

import { TokenPayload } from '@/common/models/ITokenInfo';

export default function isTokenValid(token: string): boolean {
  const { exp } = decodeJwt(token);

  if (!exp) {
    return false;
  }

  const differenceFromNow = differenceInSeconds(exp * 1000, Date.now());

  console.log('access token expires in:', differenceFromNow, 'seconds');

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

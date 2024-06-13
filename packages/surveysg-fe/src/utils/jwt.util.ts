import { differenceInSeconds } from 'date-fns';
import { decodeJwt } from 'jose';

import { TokenPayload } from '@/common/models/ITokenInfo';

import useAuthenticationStore from '~/hooks/useAuthenticationStore';

export const generateAuthorizationHeader = (token: string) => `Bearer ${token}` as const;

export const getTokenRemainingSeconds = (token: string) => {
  try {
    const { exp } = decodeJwt(token);
    if (!exp) {
      return 0;
    }

    const differenceFromNow = differenceInSeconds(exp * 1000, Date.now());
    return differenceFromNow;
  } catch (error) {
    // console.log('getTokenRemainingSeconds exception:', error);

    return 0;
  }
};

export const isTokenValid = (token: string): boolean => getTokenRemainingSeconds(token) > 0;

export function decodeJwtToken(token: string) {
  try {
    return decodeJwt<TokenPayload>(token);
  } catch (error) {
    // console.log('decodeJwtToken exception:', error);

    return undefined;
  }
}

export function debugTokenExpiration() {
  const { accessToken, refreshToken } = useAuthenticationStore.getState();

  const accessTokenRemaining = getTokenRemainingSeconds(accessToken ?? '');
  const refreshTokenRemaining = getTokenRemainingSeconds(refreshToken ?? '');

  console.log('access token expires in:', accessTokenRemaining, 'seconds');
  console.log('refresh token expires in:', refreshTokenRemaining, 'seconds');
}

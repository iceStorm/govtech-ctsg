import { useEffect } from 'react';

import apiClient from '~/api';
import { generateAuthorizationHeader } from '~/utils/jwt.util';

import useAuthenticationStore from './useAuthenticationStore';

export default function useRefreshToken() {
  const [refreshToken, setTokens] = useAuthenticationStore((store) => [
    store.refreshToken,
    store.setTokens,
  ]);

  const { data } = apiClient.auth.refreshToken.useQuery(['refresh-token'], {
    extraHeaders: { Authorization: generateAuthorizationHeader(refreshToken ?? '') },
  });

  useEffect(() => {
    if (data?.body) {
      setTokens(data.body.accessToken, data.body.refreshToken);
    }
  }, [data?.body, setTokens]);
}

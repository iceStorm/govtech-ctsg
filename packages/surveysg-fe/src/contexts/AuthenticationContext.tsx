import { PropsWithChildren, createContext, useMemo, useState } from 'react';

import ITokenInfo from '@/common/models/ITokenInfo';

import isTokenValid, { decodeJwtToken } from '~/utils/jwt.util';

type IAuthenticationContext = {
  accessToken?: string | null;
  refreshToken?: string | null;

  setLoginSession(accessToken: string, refreshToken: string): void;
  logOut(): void;

  isLoggedIn: boolean;
  currentUser: ITokenInfo;
};

const AuthenticationContext = createContext<IAuthenticationContext | undefined>(undefined);

export default AuthenticationContext;

export function AuthenticationContextProvider({ children }: PropsWithChildren) {
  // read tokens from local storage when application first load or reload
  const [persistedAccessToken, setPersistedAccessToken] = useState(() =>
    localStorage.getItem('accessToken'),
  );
  const [persistedRefreshToken, setPersistedRefreshToken] = useState(() =>
    localStorage.getItem('refreshToken'),
  );

  const currentUser: ITokenInfo = useMemo(
    () => decodeJwtToken(persistedAccessToken ?? '') as never,
    [persistedAccessToken],
  );

  const contextValues: IAuthenticationContext = useMemo(
    () => ({
      currentUser,
      accessToken: persistedAccessToken,
      refreshToken: persistedRefreshToken,
      isLoggedIn: Boolean(persistedAccessToken && isTokenValid(persistedAccessToken)),

      setLoginSession(accessToken, refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        setPersistedAccessToken(accessToken);
        setPersistedRefreshToken(refreshToken);
      },

      logOut() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setPersistedAccessToken(null);
        setPersistedRefreshToken(null);
      },
    }),
    [currentUser, persistedAccessToken, persistedRefreshToken],
  );

  return (
    <AuthenticationContext.Provider value={contextValues}>
      {children}
    </AuthenticationContext.Provider>
  );
}

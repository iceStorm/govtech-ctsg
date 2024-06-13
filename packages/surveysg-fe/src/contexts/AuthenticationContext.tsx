import { PropsWithChildren, createContext, useMemo } from 'react';

import ITokenInfo from '@/common/models/ITokenInfo';

import useAuthenticationStore from '~/hooks/useAuthenticationStore';
import { isTokenValid, decodeJwtToken } from '~/utils/jwt.util';

type IAuthenticationContext = {
  accessToken?: string;
  refreshToken?: string;

  setLoginInfo(accessToken: string, refreshToken: string): void;
  logOut(): void;

  isLoggedIn: boolean;
  currentUser: ITokenInfo;
};

const AuthenticationContext = createContext<IAuthenticationContext | undefined>(undefined);

export default AuthenticationContext;

export function AuthenticationContextProvider({ children }: PropsWithChildren) {
  const [accessToken, refreshToken, setTokens, clearTokens] = useAuthenticationStore((store) => [
    store.accessToken,
    store.refreshToken,
    store.setTokens,
    store.clearTokens,
  ]);

  const currentUser: ITokenInfo = useMemo(
    () => decodeJwtToken(accessToken ?? '') as never,
    [accessToken],
  );

  const contextValues = useMemo(
    () =>
      ({
        currentUser,
        accessToken,
        refreshToken,
        isLoggedIn: Boolean(
          (accessToken && isTokenValid(accessToken)) ||
            (refreshToken && isTokenValid(refreshToken)),
        ),
        setLoginInfo: setTokens,
        logOut: clearTokens,
      }) satisfies IAuthenticationContext,
    [accessToken, clearTokens, currentUser, refreshToken, setTokens],
  );

  return (
    <AuthenticationContext.Provider value={contextValues}>
      {children}
    </AuthenticationContext.Provider>
  );
}

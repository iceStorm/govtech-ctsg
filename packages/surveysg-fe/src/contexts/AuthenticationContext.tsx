import { PropsWithChildren, createContext, useEffect, useMemo } from 'react';

import ITokenInfo from '@/common/models/ITokenInfo';

import useAuthenticationStore from '~/hooks/useAuthenticationStore';
import { isTokenValid, decodeJwtToken } from '~/utils/jwt.util';

type IAuthenticationContext = {
  accessToken?: string;
  refreshToken?: string;

  setLoginInfo(accessToken: string, refreshToken: string): void;
  logOut(): void;
  setRegistrationStatus(isRegistered: boolean): void;

  isLoggedIn: boolean;
  currentUser: ITokenInfo;
  isRegistered?: boolean;
};

const AuthenticationContext = createContext<IAuthenticationContext | undefined>(undefined);

export default AuthenticationContext;

export function AuthenticationContextProvider({ children }: PropsWithChildren) {
  const [accessToken, refreshToken, isRegistered, setTokens, clearTokens, setRegistrationStatus] =
    useAuthenticationStore((store) => [
      store.accessToken,
      store.refreshToken,
      store.isRegistered,
      store.setTokens,
      store.clearTokens,
      store.setRegistrationStatus,
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
        isRegistered,
        isLoggedIn: Boolean(
          (accessToken && isTokenValid(accessToken)) ||
            (refreshToken && isTokenValid(refreshToken)),
        ),

        setLoginInfo: setTokens,
        setRegistrationStatus,
        logOut: clearTokens,
      }) satisfies IAuthenticationContext,
    [
      accessToken,
      clearTokens,
      currentUser,
      isRegistered,
      refreshToken,
      setRegistrationStatus,
      setTokens,
    ],
  );

  useEffect(() => {
    // set registration status if it is not set and user is registered
    if (isRegistered === undefined && currentUser.isRegistered) {
      setRegistrationStatus(currentUser.isRegistered);
    }
  }, [currentUser.isRegistered, isRegistered, setRegistrationStatus]);

  return (
    <AuthenticationContext.Provider value={contextValues}>
      {children}
    </AuthenticationContext.Provider>
  );
}

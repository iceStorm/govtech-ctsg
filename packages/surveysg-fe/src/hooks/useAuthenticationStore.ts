import { persist, createJSONStorage } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import IAuthenticationInfo from '@/common/models/IAuthenticationInfo';

type IAuthenticationStore = Partial<IAuthenticationInfo> & {
  isRegistered?: boolean;

  setRegistrationStatus(isRegistered: boolean): void;
  setTokens(accessToken: string, refreshToken: string): void;
  clearTokens(): void;
};

// store and sync tokens within the application with localStorage
const useAuthenticationStore = createWithEqualityFn<IAuthenticationStore>()(
  persist(
    (set) => ({
      setTokens(accessToken, refreshToken) {
        set({ accessToken, refreshToken });
      },

      clearTokens() {
        set({ accessToken: undefined, refreshToken: undefined, isRegistered: undefined });
      },

      setRegistrationStatus(isRegistered) {
        set(() => ({ isRegistered }));
      },
    }),

    { name: 'auth-store', storage: createJSONStorage(() => localStorage) },
  ),

  shallow,
);

export default useAuthenticationStore;

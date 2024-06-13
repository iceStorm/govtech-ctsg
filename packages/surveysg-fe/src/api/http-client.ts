import axios, { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import createRetryInterceptor from 'axios-auth-refresh';

import IAuthenticationInfo from '@/common/models/IAuthenticationInfo';

import AppStatic from '~/components/AppStatic';
import useAuthenticationStore from '~/hooks/useAuthenticationStore';
import { generateAuthorizationHeader } from '~/utils/jwt.util';
import navigateToLoginPage from '~/utils/navigation.util';

import apiRouter from './router';

const httpClient = axios.create({
  timeout: 5000,
});

createRetryInterceptor(
  httpClient,

  // on errors that matches the condition inside "statusCodes"
  async (apiError: AxiosError) => {
    const { refreshToken, setTokens } = useAuthenticationStore.getState();

    try {
      // refresh tokens silently
      const refreshedAuthResponse = await axios.get<IAuthenticationInfo>(
        `${import.meta.env.VITE_API_URL}${apiRouter.auth.refreshToken.path}`,
        {
          headers: {
            Authorization: generateAuthorizationHeader(refreshToken ?? ''),
          },
        },
      );

      const refreshedAuthInfo = refreshedAuthResponse.data;

      setTokens(refreshedAuthInfo.accessToken, refreshedAuthInfo.refreshToken);

      // update a failed request's authentication token header
      // the interceptor will do the retry
      // eslint-disable-next-line no-param-reassign
      apiError.response!.config.headers.Authorization = generateAuthorizationHeader(
        refreshedAuthInfo.accessToken,
      );
    } catch (error) {
      if (!isAxiosError(error)) {
        throw error;
      }

      AppStatic.notification.error({
        message: 'Your GOVAA login session has been expired',
      });

      useAuthenticationStore.getState().clearTokens();

      // whenever refresh token errors --> login again
      navigateToLoginPage();
    }
  },
  {
    // status codes to retry
    statusCodes: [HttpStatusCode.Unauthorized],
  },
);

export default httpClient;

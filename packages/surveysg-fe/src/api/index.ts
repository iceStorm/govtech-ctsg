import { initQueryClient } from '@ts-rest/react-query';
import { Method, AxiosError, isAxiosError, AxiosResponse } from 'axios';

import useAuthenticationStore from '~/hooks/useAuthenticationStore';
import { generateAuthorizationHeader } from '~/utils/jwt.util';

import httpClient from './http-client';
import apiRouter from './router';

// https://ts-rest.com/docs/core/custom#using-axios-custom-api-override
const apiClient = initQueryClient(apiRouter, {
  baseUrl: import.meta.env.VITE_API_URL,
  api: async (args) => {
    const { path, method, headers, body } = args;

    const { accessToken } = useAuthenticationStore.getState();

    headers.Authorization = generateAuthorizationHeader(accessToken ?? '');

    try {
      const result = await httpClient.request({
        method: method as Method,
        url: path,
        headers,
        data: body,
      });

      return {
        status: result.status,
        body: result.data,
        headers: result.headers as unknown as Headers,
      };
    } catch (e: Error | AxiosError | unknown) {
      if (isAxiosError(e)) {
        const error = e as AxiosError;
        const response = error.response as AxiosResponse;

        return {
          status: response.status,
          body: response.data,
          headers: response.headers as unknown as Headers,
        };
      }

      throw e;
    }
  },
});

export default apiClient;

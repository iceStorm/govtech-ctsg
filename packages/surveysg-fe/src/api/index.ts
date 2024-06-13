import { tsRestFetchApi } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';

import apiRouter from './router';

const apiClient = initQueryClient(apiRouter, {
  baseUrl: import.meta.env.VITE_API_URL,
  api: async (args) => {
    const accessToken = localStorage.getItem('accessToken') ?? '';

    // eslint-disable-next-line no-param-reassign
    args.headers.Authorization = `Bearer ${accessToken}`;

    return tsRestFetchApi(args);
  },
});

export default apiClient;

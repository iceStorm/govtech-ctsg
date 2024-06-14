import { initClient } from '@ts-rest/core';

import govaaRouter from './router';

const baseUrl =
  process.env.DEV_PLATFORM === 'DOCKER' ? 'http://govaa_backend:7500/api' : process.env.GOVAA_URL;

const govaaApiClient = initClient(govaaRouter, {
  baseUrl,
});

export default govaaApiClient;

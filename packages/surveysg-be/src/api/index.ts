import { initClient } from '@ts-rest/core';

import govaaRouter from './router';

const govaaApiClient = initClient(govaaRouter, { baseUrl: process.env.GOVAA_URL });

export default govaaApiClient;

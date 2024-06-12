import { initQueryClient } from '@ts-rest/react-query';

import apiRouter from './router';

const apiClient = initQueryClient(apiRouter, { baseUrl: import.meta.env.VITE_API_URL });

export default apiClient;

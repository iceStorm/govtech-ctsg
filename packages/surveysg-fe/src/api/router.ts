import LoginPayload from '@/common/dtos/login-payload.dto';
import type GovernmentAgencyEntity from '@/common/entities/GovernmentAgencyEntity';
import type SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import IServerError from '@/common/models/IServerError';

import c from './c';

const apiRouter = c.router(
  {
    login: {
      path: '/auth/login',
      method: 'POST',
      body: c.type<LoginPayload>(),
      responses: {
        200: c.type<{ accessToken: string; refreshToken: string }>(),
      },
    },

    createAccount: {
      path: '/users/create',
      method: 'POST',
      body: c.type<SurveyUserEntity>(),
      responses: {
        201: c.type<SurveyUserEntity>(),
      },
    },

    getProfile: {
      path: '/users/profile',
      method: 'GET',
      responses: {
        200: c.type<SurveyUserEntity>(),
      },
    },

    getGovernmentAgencies: {
      path: '/government-agencies',
      method: 'GET',
      responses: {
        200: c.type<GovernmentAgencyEntity[]>(),
      },
    },
  },
  {
    commonResponses: {
      401: c.type<IServerError>(),
      403: c.type<IServerError>(),
      409: c.type<IServerError>(),
    },
  },
);

export default apiRouter;

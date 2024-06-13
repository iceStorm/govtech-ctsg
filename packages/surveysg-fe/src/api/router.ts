import type GovernmentAgencyEntity from '@/common/entities/GovernmentAgencyEntity';
import IServerError from '@/common/models/IServerError';

import c from './c';
import authRouter from './routers/auth.router';
import usersRouter from './routers/users.router';

const apiRouter = c.router(
  {
    auth: authRouter,
    users: usersRouter,

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
      404: c.type<IServerError>(),
      403: c.type<IServerError>(),
      409: c.type<IServerError>(),
    },
  },
);

export default apiRouter;

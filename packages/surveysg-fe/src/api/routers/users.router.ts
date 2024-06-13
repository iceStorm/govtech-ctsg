import SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import IServerError from '@/common/models/IServerError';

import c from '../c';

const usersRouter = c.router({
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
      404: c.type<IServerError>(),
    },
  },
});

export default usersRouter;

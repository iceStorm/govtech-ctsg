import LoginPayload from '@/common/dtos/login-payload.dto';

import c from './c';

const apiRouter = c.router({
  login: {
    path: '/auth/login',
    method: 'POST',
    body: c.type<LoginPayload>(),
    responses: {
      200: c.type<{ accessToken: string; refreshToken: string }>(),
    },
  },

  createAccount: {},

  getProfile: {
    path: '/users/profile',
    method: 'GET',
    responses: {
      200: c.type<object>(),
    },
  },
});

export default apiRouter;

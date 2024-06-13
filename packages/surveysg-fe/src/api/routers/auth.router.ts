import LoginPayload from '@/common/dtos/login-payload.dto';
import IAuthenticationInfo from '@/common/models/IAuthenticationInfo';

import c from '../c';

const authRouter = c.router({
  login: {
    path: '/auth/login',
    method: 'POST',
    body: c.type<LoginPayload>(),
    responses: {
      200: c.type<IAuthenticationInfo>(),
    },
  },

  refreshToken: {
    path: '/auth/refresh',
    method: 'GET',
    responses: {
      200: c.type<IAuthenticationInfo>(),
    },
  },
});

export default authRouter;

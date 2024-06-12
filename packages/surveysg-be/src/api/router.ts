import type LoginPayload from '@/common/dtos/login-payload.dto';

import c from './c';

const govaaRouter = c.router({
  login: {
    path: '/auth',
    method: 'POST',
    body: c.type<LoginPayload>(),
    responses: {
      200: c.type<{ name: string }>(),
    },
  },
});

export default govaaRouter;

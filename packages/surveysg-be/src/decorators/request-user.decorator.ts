import { createParamDecorator } from '@nestjs/common';

const TokenInfo = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export default TokenInfo;

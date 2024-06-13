import { createParamDecorator } from '@nestjs/common';

const TokenInfo = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.tokenInfo;
});

export default TokenInfo;

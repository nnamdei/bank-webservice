import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// deconstructs the jwt
export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

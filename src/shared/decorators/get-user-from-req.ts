import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/auth/dto/user-payload';

export const GetUserFromReq = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    // Return the full user object if no specific property is requested
    return data ? user?.[data] : user;
  },
);

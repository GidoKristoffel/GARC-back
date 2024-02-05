import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../../../src/modules/shared/auth/interfaces/auth.interface';

export const CurrentUser = createParamDecorator(
  (key: keyof JwtPayload, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);

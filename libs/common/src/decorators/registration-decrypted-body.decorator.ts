import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RegisterDto } from '@auth/dto';

export const  RegistrationDecryptedBody = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body: RegisterDto = {
      username: atob(request.body.username),
      email: request.body.email,
      password: atob(request.body.password),
      passwordRepeat: atob(request.body.passwordRepeat),
    };
    return body;
  },
);

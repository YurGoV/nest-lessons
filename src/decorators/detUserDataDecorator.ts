import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserData = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { email, _id } = request.user;
  // console.log(email, _id, 'in custom decorator');
  return { email, _id };
});

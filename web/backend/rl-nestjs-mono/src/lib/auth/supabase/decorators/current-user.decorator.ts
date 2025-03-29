import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const currentUser = context.switchToHttp().getRequest().user;
    if (!currentUser) {
      return null;
    }
    return {...currentUser, email: currentUser.email?.toLowerCase()};
  },
);

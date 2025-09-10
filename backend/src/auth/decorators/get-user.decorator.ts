import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express'; // 1. Importe o tipo 'Request' do Express

// 2. Crie uma interface que descreve nosso objeto Request modificado
interface RequestWithUser extends Request {
  user: User;
}

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // 3. Use nossa nova interface para dar um tipo explícito ao request
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

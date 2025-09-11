import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from 'src/users/entities/user.entity'; // 1. Importar a entidade User
import { Request } from 'express'; // 2. Importar o tipo Request do Express

// 3. Definir uma interface para o nosso request que inclui o utilizador
interface RequestWithUser extends Request {
  user: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 4. CORREÇÃO DE FORMATAÇÃO: Reformatado para agradar ao Prettier
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    // 5. CORREÇÃO DE TIPO: Damos um tipo explícito ao nosso request
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const { user } = request;

    // Agora o TypeScript sabe que 'user' tem uma propriedade 'role'
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}

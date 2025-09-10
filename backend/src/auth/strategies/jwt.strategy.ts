import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    // --- INÍCIO DA CORREÇÃO ---
    // 1. Pegamos o segredo primeiro.
    const secret = configService.get<string>('JWT_SECRET');

    // 2. Verificamos se ele existe. Se não, quebramos a aplicação intencionalmente.
    if (!secret) {
      throw new Error(
        'JWT_SECRET não está definido nas variáveis de ambiente. A aplicação não pode iniciar.',
      );
    }
    // --- FIM DA CORREÇÃO ---

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 3. Agora, o TypeScript tem certeza de que 'secret' é uma string.
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<User> {
    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return result as User;
  }
}

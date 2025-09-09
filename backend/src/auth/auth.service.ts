import {
  Injectable,
  ConflictException,
  UnauthorizedException, // Precisamos deste novo erro
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // 1. Importe o LoginDto
import { JwtService } from '@nestjs/jwt'; // 2. Importe o JwtService

@Injectable()
export class AuthService {
  // 3. Injete ambos os serviços (UsersService e JwtService)
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException('Email already registered');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const user = await this.usersService.create(
      registerDto.email,
      hashedPassword,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return result;
  }

  // ---- 4. NOSSO NOVO MÉTODO DE LOGIN ----
  async login(loginDto: LoginDto) {
    // 1. Encontre o usuário
    const user = await this.usersService.findByEmail(loginDto.email);

    // 2. Se não achar, ou se o usuário não tiver hash (nunca deve acontecer), lance Erro 401
    if (!user || !user.password_hash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Compare a senha do DTO com o hash do banco de dados
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    // 4. Se as senhas não baterem, lance Erro 401
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 5. SUCESSO. Crie o "payload" (carga útil) do JWT
    const payload = { sub: user.id, email: user.email }; // 'sub' (subject) é o ID do usuário (padrão do JWT)

    // 6. Assine o token e retorne-o
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

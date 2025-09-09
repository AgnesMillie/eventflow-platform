import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Injetamos o UsersService que criamos (que fala com o banco)
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    // 1. O usuário já existe? (Usamos a função que criamos no UsersService)
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException('Email already registered'); // Erro 409
    }

    // 2. Hashear a senha (usando bcrypt)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // 3. Criar o usuário (usando o UsersService)
    const user = await this.usersService.create(
      registerDto.email,
      hashedPassword,
    );

    // 4. Retornar os dados (NUNCA retorne o HASH da senha!)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return result;
  }
}

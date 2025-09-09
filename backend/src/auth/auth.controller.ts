import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // 1. Importe o LoginDto

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    // (O endpoint de registro que já fizemos)
    return this.authService.register(registerDto);
  }

  // --- 2. NOSSO NOVO ENDPOINT DE LOGIN ---
  @HttpCode(HttpStatus.OK) // Por padrão, POST retorna 201. Dizemos para retornar 200 (OK) no login.
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    // Validação automática pelo ValidationPipe (graças ao main.ts)
    return this.authService.login(loginDto);
  }
}

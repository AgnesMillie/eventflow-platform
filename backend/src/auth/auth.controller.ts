import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth') // Todos os endpoints aqui começarão com /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // A rota completa é POST /auth/register
  // O Nest (graças ao ValidationPipe) irá automaticamente pegar o Body do request,
  // validá-lo contra o RegisterDto, e nos entregar o objeto DTO limpo.
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}

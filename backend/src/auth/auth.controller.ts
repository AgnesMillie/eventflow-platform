import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get, // 1. Importe o Get
  UseGuards, // 2. Importe o UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport'; // 3. Importe a Guarda
import { GetUser } from './decorators/get-user.decorator'; // 4. Importe nosso decorator
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // ---- 5. NOSSO NOVO ENDPOINT PROTEGIDO ----
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // APLICA A GUARDA: 'jwt' é o nome padrão da nossa JwtStrategy
  getProfile(@GetUser() user: User) {
    // Graças ao nosso decorator @GetUser(), a variável 'user' já contém
    // os dados do usuário que foram validados e retornados pela JwtStrategy.
    return user;
  }
}

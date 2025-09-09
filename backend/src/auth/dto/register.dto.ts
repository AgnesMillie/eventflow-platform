import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail() // Validador: Garante que o campo é um email válido
  @IsNotEmpty() // Validador: Garante que não está vazio
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' }) // Validador: Mínimo 8 chars
  password: string;
}

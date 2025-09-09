import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module'; // 1. Importe o UsersModule

@Module({
  imports: [UsersModule], // 2. Adicione aos Imports
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

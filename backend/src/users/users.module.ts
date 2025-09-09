import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service'; // 1. Importe o serviço

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService], // 2. Adicione o serviço aos Providers
  exports: [UsersService], // 3. EXPORTE o serviço (CRUCIAL!)
})
export class UsersModule {}

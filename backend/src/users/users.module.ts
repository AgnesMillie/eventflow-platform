import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Importa nossa entidade

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Diz ao Nest/TypeORM: "Este módulo usa a tabela User"
  ],
  // (Mais tarde, colocaremos serviços e controladores aqui)
})
export class UsersModule {}

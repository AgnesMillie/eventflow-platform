import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    // CORREÇÃO 2: Adicionamos 'readonly' para o SonarLint
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(email: string, password_hash: string): Promise<User> {
    const newUser = this.usersRepository.create({ email, password_hash });
    return this.usersRepository.save(newUser);
  }

  // CORREÇÃO 1: Mudamos o tipo de retorno de 'undefined' para 'null'
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}

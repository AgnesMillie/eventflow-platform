import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' }) // Isso diz ao TypeORM para criar uma tabela chamada 'users'
export class User {
  @PrimaryGeneratedColumn('uuid') // Chave primária automática (UUID é melhor que números)
  id: string;

  @Column({ unique: true }) // O email deve ser único
  email: string;

  @Column()
  password_hash: string; // NUNCA guardamos a senha pura, apenas o "hash" dela

  @CreateDateColumn() // Coluna automática de data de criação
  created_at: Date;

  @UpdateDateColumn() // Coluna automática de data de atualização
  updated_at: Date;
}

import 'mysql2'; // Vamos manter isso por segurança.
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // 1. IMPORTAMOS O NOVO MÓDULO
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),

        // --- MUDANÇA PRINCIPAL AQUI ---
        // Em vez de procurar arquivos manualmente (o que está quebrando)...
        // ...nós dizemos ao TypeORM para carregar automaticamente as entidades
        // que foram registradas usando o "TypeOrmModule.forFeature()" (que fizemos no UsersModule).
        autoLoadEntities: true,

        synchronize: true, // Manter isso para dev.
      }),
    }),

    UsersModule,

    AuthModule,

    EventsModule, // 2. REGISTRAMOS O UsersModule AQUI
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

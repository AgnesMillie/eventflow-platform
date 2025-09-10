import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa o Validation Pipe Globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // <<< ADICIONE ESTA LINHA AQUI
  app.enableCors(); // Isso habilita o CORS para todas as origens (perfeito para desenvolvimento)

  await app.listen(3000);
}

void bootstrap();

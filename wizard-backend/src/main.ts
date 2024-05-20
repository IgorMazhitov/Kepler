import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });
  const connection = app.get(DataSource);
  await connection.runMigrations();
  await app.listen(3300, () => {
    console.log('Server is running on http://localhost:3300');
  });
}
bootstrap();

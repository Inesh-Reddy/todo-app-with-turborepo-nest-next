import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    options: {
      url: 'http://localhost:3001/trpc',
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

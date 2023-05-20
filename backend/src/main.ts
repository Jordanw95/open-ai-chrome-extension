import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: 'chrome-extension://ifoeiofgplohnkldjcnihjoehfbbpjfo',
  });

  await app.listen(process.env.APP_PORT);
}
bootstrap();

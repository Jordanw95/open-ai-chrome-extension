import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // For now we will allow all origins as requests are sent from content
  // script injected in the page and not from the extension itself.
  // Should eventually be changed to only allow requests from the extension.
  app.enableCors();

  await app.listen(process.env.APP_PORT);
}
bootstrap();

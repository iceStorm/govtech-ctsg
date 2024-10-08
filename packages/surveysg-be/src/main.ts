/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import AppModule from './app/app.module';
import AppExceptionFilter from './filters/app-exception.filter';
import setupSwagger from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const port = process.env.PORT ?? 7501;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

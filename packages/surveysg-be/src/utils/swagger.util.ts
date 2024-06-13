import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addServer('api')
    .setTitle('SyrveySG API')
    .setDescription('SurveySG API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });

  SwaggerModule.setup('documents', app, document);
}

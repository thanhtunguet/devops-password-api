import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { name, description } from '../package.json';
import { NODE_ENV } from './config/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let documentBuilder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion('1.0');

  if (NODE_ENV !== 'production') {
    documentBuilder = documentBuilder.addServer('http://localhost:3000');
  }

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();

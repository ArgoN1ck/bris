/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as env from 'env-var';
import { readFileSync } from 'fs';
import { AppModule } from './app/app.module';

const DEFAULT_APP_HOST = 'localhost';
const DEFAULT_APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = env.get('SERVER_PORT').default(DEFAULT_APP_PORT).asPortNumber();
  const hostname = env.get('SERVER_HOST').default(DEFAULT_APP_HOST).asString();

  const packageJson: { version: string; name: string; description: string } =
    JSON.parse(readFileSync('./package.json').toString());

  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port, hostname, () =>
    Logger.log(
      `🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`
    )
  );
}
bootstrap();

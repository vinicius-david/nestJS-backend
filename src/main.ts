import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { serverConfig } from './common/config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (serverConfig().env === 'development') {
    const docOptions = new DocumentBuilder()
      .setTitle('NestJS basic backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, docOptions);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

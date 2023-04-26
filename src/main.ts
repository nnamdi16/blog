import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import morgan = require('morgan');
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Workwise-Trial')
    .setDescription('Blog documentation')
    .setVersion('1.0')
    .addTag('')
    .setExternalDoc('Postman Collection', '/api-json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(Logger));
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());
  app.enableCors();
  app.use(morgan('dev'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

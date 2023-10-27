import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GitHubExceptionFilter } from './commons/infrastructure/filters/github-exception.filter';
import { responseFormatMiddleware } from './commons/infrastructure/middlewares/response-format.middleware';
import { LogLevel } from '@nestjs/common';
import { LoggerInterceptor } from './utils/logger.interceptor';
import { BaseExceptionFilter } from './commons/infrastructure/filters/base-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'verbose', 'debug'];
 
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  app.use(responseFormatMiddleware);
  app.enableCors();
  app.useGlobalFilters(new GitHubExceptionFilter(), new BaseExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  const config = new DocumentBuilder()
    .setTitle('API GET COMMS')
    .setDescription('API component for technical test for Fulltimeforce company.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();

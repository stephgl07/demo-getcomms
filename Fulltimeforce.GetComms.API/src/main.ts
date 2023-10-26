import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GitHubExceptionFilter } from './commons/infrastructure/filters/github-exception.filter';
import { responseFormatMiddleware } from './commons/infrastructure/middlewares/response-format.middleware';
import { LogLevel } from '@nestjs/common';
import { LoggerInterceptor } from './utils/logger.interceptor';
import { BaseExceptionFilter } from './commons/infrastructure/filters/base-exception.filter';

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
  await app.listen(4000);
}
bootstrap();

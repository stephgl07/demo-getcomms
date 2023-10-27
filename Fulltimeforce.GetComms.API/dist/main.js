"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const github_exception_filter_1 = require("./commons/infrastructure/filters/github-exception.filter");
const response_format_middleware_1 = require("./commons/infrastructure/middlewares/response-format.middleware");
const logger_interceptor_1 = require("./utils/logger.interceptor");
const base_exception_filter_1 = require("./commons/infrastructure/filters/base-exception.filter");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const isProduction = process.env.NODE_ENV === 'production';
    const logLevels = isProduction
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'verbose', 'debug'];
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logLevels,
    });
    app.use(response_format_middleware_1.responseFormatMiddleware);
    app.enableCors();
    app.useGlobalFilters(new github_exception_filter_1.GitHubExceptionFilter(), new base_exception_filter_1.BaseExceptionFilter());
    app.useGlobalInterceptors(new logger_interceptor_1.LoggerInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API GET COMMS')
        .setDescription('API component for technical test for Fulltimeforce company.')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
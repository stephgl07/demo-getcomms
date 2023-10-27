import { ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
export declare class BaseExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}

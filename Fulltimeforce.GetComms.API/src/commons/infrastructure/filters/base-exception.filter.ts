import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponseError } from 'src/commons/domain/dtos/api/api-global-response';

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const apiResponse: ApiResponseError = {
      statusCode: HttpStatus.BAD_REQUEST,
      error: exception.message
    };
    response.status(status).json(apiResponse);
  }
}

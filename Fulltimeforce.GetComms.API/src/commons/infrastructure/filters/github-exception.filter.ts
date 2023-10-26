import { ApiGitHubResponseError } from 'src/commons/domain/dtos/api/github-api-response';
// github-exception-filter.ts
import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { GitHubApiException } from 'src/commons/domain/dtos/api/github-exceptions';
import { ApiResponseError } from 'src/commons/domain/dtos/api/api-global-response';

@Catch(GitHubApiException)
export class GitHubExceptionFilter implements ExceptionFilter {
  catch(exception: GitHubApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const apiResponse: ApiGitHubResponseError = {
      statusCode: HttpStatus.BAD_REQUEST,
      data: {
        githubStatusCode: status,
        error: exception.message,
      }
    };
    response.status(HttpStatus.BAD_REQUEST).json(apiResponse);
  }
}
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { GitHubApiException } from 'src/commons/domain/dtos/api/github-exceptions';
export declare class GitHubExceptionFilter implements ExceptionFilter {
    catch(exception: GitHubApiException, host: ArgumentsHost): void;
}

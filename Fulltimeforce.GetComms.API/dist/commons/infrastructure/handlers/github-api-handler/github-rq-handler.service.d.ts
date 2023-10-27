import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { IGithubRequestHandler } from './github-rq-handler.interface';
import { ApiGitHubResponse } from '../../../domain/dtos/api/github-api-response';
export declare class GithubRequestHandler implements IGithubRequestHandler {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    Get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiGitHubResponse<T>>;
}

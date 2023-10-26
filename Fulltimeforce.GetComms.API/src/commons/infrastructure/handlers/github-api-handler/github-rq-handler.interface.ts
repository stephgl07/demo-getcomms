import { AxiosRequestConfig } from 'axios';
import { ApiGitHubResponse } from '../../../domain/dtos/api/github-api-response';

export interface IGithubRequestHandler {
  Get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiGitHubResponse<T>>;
}

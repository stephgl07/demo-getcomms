import { AxiosResponse } from 'axios';
import { ApiResponse } from './api-global-response';

export interface ApiGitHubResponse<T> extends AxiosResponse<T> {}

export interface ApiGitHubResponseErrorFormat{
    githubStatusCode: number,
    error: string;
}

export interface ApiGitHubResponseError extends ApiResponse<ApiGitHubResponseErrorFormat> {}
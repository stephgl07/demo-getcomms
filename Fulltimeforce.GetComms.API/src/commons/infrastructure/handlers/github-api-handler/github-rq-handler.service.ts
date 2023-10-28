import { HttpService } from '@nestjs/axios';
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { IGithubRequestHandler } from './github-rq-handler.interface';
import { ApiGitHubResponse } from '../../../domain/dtos/api/github-api-response'; // Importa la interfaz ApiResponse
import {
  GitHubApiException,
  GitHubNotFoundException,
  GitHubRateLimitException,
  GitHubUnprocessableEntityException,
} from 'src/commons/domain/dtos/api/github-exceptions';

@Injectable()
export class GithubRequestHandler implements IGithubRequestHandler {
  private readonly logger = new Logger('GithubAPI');
  constructor(private readonly httpService: HttpService) {}
  public async Get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiGitHubResponse<T>> {
    try {
      const response = await firstValueFrom(this.httpService.get(url, config));
      this.logger.log("Github API call: " + url + " - " + response.status + " - " + response.statusText);
      if ((response.status === HttpStatus.NOT_FOUND)) throw new GitHubNotFoundException();
      if ((response.status === HttpStatus.UNPROCESSABLE_ENTITY))
        throw new GitHubUnprocessableEntityException();
      return response;
    } catch (error) {
      const dataError = error?.response?.data;
      if(dataError){
        this.logger.error(error.response.data);
        if(error.response.data.message.includes("API rate limit exceeded")) throw new GitHubApiException("API rate limit exceeded");
      }
      throw new GitHubApiException('Error while processing the request');
    }
  }
}

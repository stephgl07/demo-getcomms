import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommitsEntity } from 'src/commons/domain/entities/commits.entity';
import { ApiGitHubResponse } from 'src/commons/domain/dtos/api/github-api-response';
import { IGithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.interface';
import { GithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.service';
import { ICommitsService } from './commits.interface';
import { CommitEntity } from 'src/commons/domain/entities/commit.entity';

@Injectable()
export class CommitsService implements ICommitsService {
  constructor(
    @Inject(GithubRequestHandler)
    private readonly githubRequestHandler: IGithubRequestHandler,
    private configService: ConfigService // Inyecta ConfigService
  ) {}

  async getCommits(repoName: string, page: number, per_page: number): Promise<CommitsEntity[]> {

    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const user = this.configService.get<string>('API_USER');
    const token = this.configService.get<string>('API_TOKEN');

    // Configura los encabezados para la autenticación si es necesario
    const headers = {};
    if (user && token) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    }

    const response: ApiGitHubResponse<CommitsEntity[]> = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/commits`, {
      headers,
      params: { page, per_page }
    });

    return response.data;
  }

  async getCommitsPerBranch(repoName: string, sha: string, page: number, per_page: number): Promise<CommitsEntity[]> {
    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const user = this.configService.get<string>('API_USER');
    const token = this.configService.get<string>('API_TOKEN');

    // Configura los encabezados para la autenticación si es necesario
    const headers = {};
    if (user && token) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    }

    const response: ApiGitHubResponse<CommitsEntity[]> = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/commits`, {
      headers,
      params: { page, per_page, sha }
    });

    return response.data;
  }

  async getCommit(repoName: string, sha: string): Promise<CommitEntity> {
    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const user = this.configService.get<string>('API_USER');
    const token = this.configService.get<string>('API_TOKEN');

    // Configura los encabezados para la autenticación si es necesario
    const headers = {};
    if (user && token) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    }

    const response: ApiGitHubResponse<CommitEntity> = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/commits/${sha}`, {
      headers
    });

    return response.data;
  }
}
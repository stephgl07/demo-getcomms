import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiGitHubResponse } from 'src/commons/domain/dtos/api/github-api-response';
import { IGithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.interface';
import { GithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.service';
import { BranchEntity } from 'src/commons/domain/entities/branch.entity';
import { IBranchesService } from './branches.interface';

@Injectable()
export class BranchesService implements IBranchesService {
  constructor(
    @Inject(GithubRequestHandler)
    private readonly githubRequestHandler: IGithubRequestHandler,
    private configService: ConfigService // Inyecta ConfigService
  ) {}

  async getBranches(repoName: string, page: number, per_page: number): Promise<BranchEntity[]> {

    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const user = this.configService.get<string>('API_USER');
    const token = this.configService.get<string>('API_TOKEN');

    // Configura los encabezados para la autenticación si es necesario
    const headers = {};
    if (user && token) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    }

    const response: ApiGitHubResponse<BranchEntity[]> = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/branches`, {
      headers,
      params: { page, per_page }
    });

    return response.data;
  }
}
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiGitHubResponse } from 'src/commons/domain/dtos/api/github-api-response';
import { IGithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.interface';
import { GithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.service';
import { IWorkflowsService } from './workflows.interface';
import { WorkflowEntity } from 'src/commons/domain/entities/workflows.entity';
import { WorkFlowRunEntity } from 'src/commons/domain/entities/workflowsruns.entity';

@Injectable()
export class WorkflowsService implements IWorkflowsService {
  constructor(
    @Inject(GithubRequestHandler)
    private readonly githubRequestHandler: IGithubRequestHandler,
    private configService: ConfigService // Inyecta ConfigService
  ) {}

  async getWorkflows(repoName: string, page?: number, per_page?: number): Promise<WorkflowEntity> {

    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const user = this.configService.get<string>('API_USER');
    const token = this.configService.get<string>('API_TOKEN');

    // Configura los encabezados para la autenticación si es necesario
    const headers = {};
    if (user && token) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    }

    const response: ApiGitHubResponse<WorkflowEntity> = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/actions/workflows`, {
      headers,
      params: { page, per_page }
    });

    return response.data;
  }

  async getWorkflowsRuns(repoName: string, workflowId: string, page: number, per_page: number): Promise<WorkFlowRunEntity> {

    const baseUrl = this.configService.get<string>('API_BASE_URL');
    const user = this.configService.get<string>('API_USER');
    const token = this.configService.get<string>('API_TOKEN');

    // Configura los encabezados para la autenticación si es necesario
    const headers = {};
    if (user && token) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
    }

    const response: ApiGitHubResponse<WorkFlowRunEntity> = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/actions/workflows/${workflowId}/runs`, {
      headers,
      params: { page, per_page }
    });

    return response.data;
  }
}
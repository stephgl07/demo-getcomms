import { ConfigService } from '@nestjs/config';
import { IGithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.interface';
import { IWorkflowsService } from './workflows.interface';
import { WorkflowEntity } from 'src/commons/domain/entities/workflows.entity';
import { WorkFlowRunEntity } from 'src/commons/domain/entities/workflowsruns.entity';
export declare class WorkflowsService implements IWorkflowsService {
    private readonly githubRequestHandler;
    private configService;
    constructor(githubRequestHandler: IGithubRequestHandler, configService: ConfigService);
    getWorkflows(repoName: string, page?: number, per_page?: number): Promise<WorkflowEntity>;
    getWorkflowsRuns(repoName: string, workflowId: string, page?: number, per_page?: number): Promise<WorkFlowRunEntity>;
}

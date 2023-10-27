import { WorkFlowRunEntity } from 'src/commons/domain/entities/workflowsruns.entity';
import { WorkflowEntity } from './../../../../commons/domain/entities/workflows.entity';

export interface IWorkflowsService {
  getWorkflows(repoName: string, page?: number, per_page?: number): Promise<WorkflowEntity>;
  getWorkflowsRuns(repoName: string, workflowId: string, page?: number, per_page?: number): Promise<WorkFlowRunEntity>
}

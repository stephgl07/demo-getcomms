import { Inject, Injectable } from '@nestjs/common';
import { IGetWorkflowsRunsUseCase } from './get-workflowsruns-use-case.interface';
import { IWorkflowsService } from '../../services/workflows/workflows.interface';
import { WorkflowsService } from '../../services/workflows/workflows.service';
import {
  GetWorkflowsRunsDTO,
  GetWorkflowsRunsRsDTO,
} from 'src/commons/domain/dtos/reponses/get-workflowsruns.interface';
import { WorkflowEntity } from 'src/commons/domain/entities/workflows.entity';
import { calculateTime, formatDate } from 'src/utils/dateFormatter';

@Injectable()
export class GetWorkflowsRunsUseCase implements IGetWorkflowsRunsUseCase {
  constructor(
    @Inject(WorkflowsService) private readonly workflowService: IWorkflowsService,
  ) {}

  async execute(
    repoName: string,
    page?: number,
    per_page?: number,
  ): Promise<GetWorkflowsRunsRsDTO[]> {
    // Getting workflows from GH API
    let workflowsRoot: WorkflowEntity =
      await this.workflowService.getWorkflows(repoName, page, per_page);

    workflowsRoot.workflows = workflowsRoot.workflows.filter((workflow) => {
        return repoName == workflow.url.split('/')[5];
    })

    const mappedWorkflows: GetWorkflowsRunsRsDTO[] = await Promise.all(
      workflowsRoot.workflows.map(async (workflow) => {
        const runs = await this.workflowService.getWorkflowsRuns(
          repoName,
          workflow.id.toString(),
          page,
          per_page,
        );

        const mappedRuns: GetWorkflowsRunsDTO[] = runs.workflow_runs.map(
          (run) => {
            return {
              head_branch: run.head_branch,
              head_sha: run.head_sha,
              display_title: run.display_title,
              run_number: run.run_number,
              status: run.status,
              conclusion: run.conclusion,
              html_url: run.html_url,
              date_created: formatDate(run.created_at),
              duration: calculateTime(run.created_at, run.updated_at),
              actor: {
                avatar_url: run.actor.avatar_url,
                user_name: run.actor.login,
                url: run.actor.url,
                html_url: run.actor.html_url,
              },
              run_attempt: run.run_attempt,
              head_commit_message: run.head_commit.message,
            };
          },
        );

        const mappedWorkflow: GetWorkflowsRunsRsDTO = {
          id: workflow.id,
          name: workflow.name,
          state: workflow.state,
          runs: mappedRuns,
        };

        return mappedWorkflow;
      }),
    );

    return mappedWorkflows;
  }
}

import { GetWorkflowsRunsRsDTO } from "src/commons/domain/dtos/reponses/get-workflowsruns.interface";

export interface IGetWorkflowsRunsUseCase {
  execute(repoName: string, page?: number, per_page?: number): Promise<GetWorkflowsRunsRsDTO[]>;
}
import { IGetWorkflowsRunsUseCase } from './get-workflowsruns-use-case.interface';
import { IWorkflowsService } from '../../services/workflows/workflows.interface';
import { GetWorkflowsRunsRsDTO } from 'src/commons/domain/dtos/reponses/get-workflowsruns.interface';
export declare class GetWorkflowsRunsUseCase implements IGetWorkflowsRunsUseCase {
    private readonly workflowService;
    constructor(workflowService: IWorkflowsService);
    execute(repoName: string, page?: number, per_page?: number): Promise<GetWorkflowsRunsRsDTO[]>;
}

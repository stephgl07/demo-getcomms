import { IGetCommitsUseCase } from '../application/use-cases/get-commits/get-commits-use-case.interface';
import { IGetBranchesUseCase } from '../application/use-cases/get-branches/get-branches-use-case.interface';
import { IGetCommitsPerBranchUseCase } from '../application/use-cases/get-commits-per-branch/get-commits-per-branch-use-case.interface';
import { IGetWorkflowsRunsUseCase } from '../application/use-cases/get-workflowsruns/get-workflowsruns-use-case.interface';
import { ConfigService } from '@nestjs/config';
export declare class RepositorySearchController {
    private readonly getCommitsUseCase;
    private readonly getBranchesUseCase;
    private readonly getCommitsPerBranchUseCase;
    private readonly getWorkflowsRunsUseCase;
    private configService;
    constructor(getCommitsUseCase: IGetCommitsUseCase, getBranchesUseCase: IGetBranchesUseCase, getCommitsPerBranchUseCase: IGetCommitsPerBranchUseCase, getWorkflowsRunsUseCase: IGetWorkflowsRunsUseCase, configService: ConfigService);
    getCommits(res: any, page?: number, per_page?: number): Promise<void>;
    getBranches(res: any, page?: number, per_page?: number): Promise<void>;
    getCommitsPerBranch(res: any, sha: string, page?: number, per_page?: number): Promise<void>;
    getCommit(sha: string, res: any): Promise<void>;
    getWorkflowsRuns(res: any, page?: number, per_page?: number): Promise<void>;
}

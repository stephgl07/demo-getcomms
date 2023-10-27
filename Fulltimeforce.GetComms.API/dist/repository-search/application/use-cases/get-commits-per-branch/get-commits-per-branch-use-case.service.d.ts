import { ICommitsService } from '../../services/commits/commits.interface';
import { IGetCommitsPerBranchUseCase } from './get-commits-per-branch-use-case.interface';
import { GetCommitsRsDTO } from 'src/commons/domain/dtos/reponses/get-commits.interface';
import { IBranchesService } from '../../services/branches/branches.interface';
export declare class GetCommitsPerBranchUseCase implements IGetCommitsPerBranchUseCase {
    private readonly commitsService;
    private readonly branchesService;
    constructor(commitsService: ICommitsService, branchesService: IBranchesService);
    execute(repoName: string, sha: string, page?: number, per_page?: number): Promise<GetCommitsRsDTO[]>;
}

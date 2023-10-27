import { ICommitsService } from '../../services/commits/commits.interface';
import { IGetCommitsUseCase } from './get-commits-use-case.interface';
import { GetCommitsRsDTO } from 'src/commons/domain/dtos/reponses/get-commits.interface';
import { GetCommitRsDTO } from 'src/commons/domain/dtos/reponses/get-commit.interface';
import { IBranchesService } from '../../services/branches/branches.interface';
export declare class GetCommitsUseCase implements IGetCommitsUseCase {
    private readonly commitsService;
    private readonly branchesService;
    constructor(commitsService: ICommitsService, branchesService: IBranchesService);
    executeGetMany(repoName: string, page?: number, per_page?: number): Promise<GetCommitsRsDTO[]>;
    executeGet(repoName: string, sha: string): Promise<GetCommitRsDTO>;
}

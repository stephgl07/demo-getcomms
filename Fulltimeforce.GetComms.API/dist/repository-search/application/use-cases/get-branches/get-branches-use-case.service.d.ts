import { IGetBranchesUseCase } from './get-branches-use-case.interface';
import { IBranchesService } from '../../services/branches/branches.interface';
import { GetBranchesRsDTO } from 'src/commons/domain/dtos/reponses/get-branches.interface';
export declare class GetBranchesUseCase implements IGetBranchesUseCase {
    private readonly apiGateway;
    constructor(apiGateway: IBranchesService);
    execute(repoName: string, page: number, per_page: number): Promise<GetBranchesRsDTO[]>;
}

import { BranchEntity } from 'src/commons/domain/entities/branch.entity';

export interface IBranchesService {
  getBranches(repoName: string, page?: number, per_page?: number): Promise<BranchEntity[]>;
}

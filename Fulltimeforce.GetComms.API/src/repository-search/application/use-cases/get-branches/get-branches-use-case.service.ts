import { Inject, Injectable } from '@nestjs/common';
import { IGetBranchesUseCase } from './get-branches-use-case.interface';
import { BranchEntity } from 'src/commons/domain/entities/branch.entity';
import { IBranchesService } from '../../services/branches/branches.interface';
import { BranchesService } from '../../services/branches/branches.service';
import { GetBranchesRsDTO } from 'src/commons/domain/dtos/reponses/get-branches.interface';

@Injectable()
export class GetBranchesUseCase implements IGetBranchesUseCase {
  constructor(
    @Inject(BranchesService) private readonly apiGateway: IBranchesService,
  ) {}

  async execute(
    repoName: string,
    page: number,
    per_page: number,
  ): Promise<GetBranchesRsDTO[]> {

    // Getting Branches from GH PI
    const branches: BranchEntity[] = await this.apiGateway.getBranches(
      repoName,
      page,
      per_page,
    );

    // Mapping DTO
    const mappedBranches = branches.map((branch) => ({
      name: branch.name,
      commit_sha: branch.commit.sha,
      protected: branch.protected,
    }));

    return mappedBranches;
  }
}

import { GetBranchesRsDTO } from "src/commons/domain/dtos/reponses/get-branches.interface";

export interface IGetBranchesUseCase {
  execute(repoName: string, page?: number, per_page?: number): Promise<GetBranchesRsDTO[]>;
}
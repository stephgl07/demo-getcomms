import { GetCommitsRsDTO } from "src/commons/domain/dtos/reponses/get-commits.interface";

export interface IGetCommitsPerBranchUseCase {
  execute(repoName: string, sha: string, page?: number, per_page?: number): Promise<GetCommitsRsDTO[]>;
}
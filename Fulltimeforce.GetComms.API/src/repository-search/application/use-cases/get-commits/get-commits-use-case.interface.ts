import { GetCommitRsDTO } from "src/commons/domain/dtos/reponses/get-commit.interface";
import { GetCommitsRsDTO } from "src/commons/domain/dtos/reponses/get-commits.interface";

export interface IGetCommitsUseCase {
  executeGetMany(repoName: string, page?: number, per_page?: number): Promise<GetCommitsRsDTO[]>;
  executeGet(repoName: string, sha: string): Promise<GetCommitRsDTO>;
}
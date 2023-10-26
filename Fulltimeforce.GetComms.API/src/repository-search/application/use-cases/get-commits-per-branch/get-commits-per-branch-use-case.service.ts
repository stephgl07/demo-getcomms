import { Inject, Injectable } from '@nestjs/common';
import { CommitsEntity } from 'src/commons/domain/entities/commits.entity';
import { ICommitsService } from '../../services/commits/commits.interface';
import { CommitsService } from '../../services/commits/commits.service';
import { IGetCommitsPerBranchUseCase } from './get-commits-per-branch-use-case.interface';
import { GetCommitsRsDTO } from 'src/commons/domain/dtos/reponses/get-commits.interface';

@Injectable()
export class GetCommitsPerBranchUseCase implements IGetCommitsPerBranchUseCase {
  constructor(
    @Inject(CommitsService) private readonly apiGateway: ICommitsService,
  ) {}
  async execute(repoName: string, sha: string, page: number, per_page: number): Promise<GetCommitsRsDTO[]> {
    const commits: CommitsEntity[] = await this.apiGateway.getCommitsPerBranch(repoName, sha, page, per_page);
    
    // Mapping DTO
    const mappedCommits: GetCommitsRsDTO[] = commits.map(comm => ({
      sha: comm.sha,
      commit: {
        author: {
          name: comm.commit.author.name,
          email: comm.commit.author.email,
          user_name: comm.author.login,
          avatar_url: comm.author.avatar_url,
          date: comm.commit.author.date,
          html_url: comm.author.html_url,
        },
        message: comm.commit.message,
        comment_count: comm.commit.comment_count,
        verification: {
          verified: comm.commit.verification.verified,
          reason: comm.commit.verification.reason,
        },
      },
      html_url: comm.html_url,
      parents: comm.parents.map(parent => ({
        sha: parent.sha,
        html_url: parent.html_url,
      })),
    }));

    return mappedCommits;
  }
}

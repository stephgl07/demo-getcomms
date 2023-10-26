import { Inject, Injectable } from '@nestjs/common';
import { CommitsEntity } from 'src/commons/domain/entities/commits.entity';
import { ICommitsService } from '../../services/commits/commits.interface';
import { CommitsService } from '../../services/commits/commits.service';
import { IGetCommitsUseCase } from './get-commits-use-case.interface';
import { GetCommitsRsDTO } from 'src/commons/domain/dtos/reponses/get-commits.interface';
import { CommitEntity } from 'src/commons/domain/entities/commit.entity';
import { GetCommitRsDTO } from 'src/commons/domain/dtos/reponses/get-commit.interface';

@Injectable()
export class GetCommitsUseCase implements IGetCommitsUseCase {
  constructor(
    @Inject(CommitsService) private readonly apiGateway: ICommitsService,
  ) {}
  async executeGetMany(repoName: string, page: number, per_page: number): Promise<GetCommitsRsDTO[]> {
    
    // Getting Commits from GH PI
    const commits: CommitsEntity[] = await this.apiGateway.getCommits(repoName, page, per_page);

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

  async executeGet(repoName: string, sha: string): Promise<GetCommitRsDTO> {
    
    // Getting Commits from GH PI
    const commit: CommitEntity = await this.apiGateway.getCommit(repoName, sha);


    // Mapping DTO
    
    const mappedCommit: GetCommitRsDTO = {
      sha: commit.sha,
      commit: {
        author: {
          name: commit.commit.author.name,
          email: commit.commit.author.email,
          user_name: commit.author.login,
          avatar_url: commit.author.avatar_url,
          date: commit.commit.author.date,
          html_url: commit.author.html_url,
        },
        message: commit.commit.message,
        comment_count: commit.commit.comment_count,
        verification: {
          verified: commit.commit.verification.verified,
          reason: commit.commit.verification.reason,
        },
      },
      html_url: commit.html_url,
      parents: commit.parents.map(parent => ({
        sha: parent.sha,
        html_url: parent.html_url,
      })),
      stats: {
        total: commit.stats.total,
        additions: commit.stats.additions,
        deletions: commit.stats.deletions
      },
      files: commit.files.map(file => ({
        sha: file.sha,
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        contents_url: file.contents_url,
        patch: file.patch,
      }))
    }

    return mappedCommit;

  }
}

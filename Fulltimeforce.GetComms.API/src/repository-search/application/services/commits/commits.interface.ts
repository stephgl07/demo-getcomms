import { CommitEntity } from 'src/commons/domain/entities/commit.entity';
import { CommitsEntity } from 'src/commons/domain/entities/commits.entity';

export interface ICommitsService {
  getCommit(repoName: string, sha: string): Promise<CommitEntity>;
  getCommits(repoName: string, page?: number, per_page?: number): Promise<CommitsEntity[]>;
  getCommitsPerBranch(repoName: string, sha: string, page?: number, per_page?: number): Promise<CommitsEntity[]>;
}

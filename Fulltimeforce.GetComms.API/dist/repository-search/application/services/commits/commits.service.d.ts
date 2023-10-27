import { ConfigService } from '@nestjs/config';
import { CommitsEntity } from 'src/commons/domain/entities/commits.entity';
import { IGithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.interface';
import { ICommitsService } from './commits.interface';
import { CommitEntity } from 'src/commons/domain/entities/commit.entity';
export declare class CommitsService implements ICommitsService {
    private readonly githubRequestHandler;
    private configService;
    constructor(githubRequestHandler: IGithubRequestHandler, configService: ConfigService);
    getCommits(repoName: string, page?: number, per_page?: number): Promise<CommitsEntity[]>;
    getCommitsPerBranch(repoName: string, sha: string, page?: number, per_page?: number): Promise<CommitsEntity[]>;
    getCommit(repoName: string, sha: string): Promise<CommitEntity>;
}

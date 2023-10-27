import { ConfigService } from '@nestjs/config';
import { IGithubRequestHandler } from 'src/commons/infrastructure/handlers/github-api-handler/github-rq-handler.interface';
import { BranchEntity } from 'src/commons/domain/entities/branch.entity';
import { IBranchesService } from './branches.interface';
export declare class BranchesService implements IBranchesService {
    private readonly githubRequestHandler;
    private configService;
    constructor(githubRequestHandler: IGithubRequestHandler, configService: ConfigService);
    getBranches(repoName: string, page?: number, per_page?: number): Promise<BranchEntity[]>;
}

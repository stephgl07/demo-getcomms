import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositorySearchController } from 'src/repository-search/controllers/repository-search.controller';
import { GetCommitsUseCase } from 'src/repository-search/application/use-cases/get-commits/get-commits-use-case.service';
import { CommitsService } from 'src/repository-search/application/services/commits/commits.service';
import { GetBranchesUseCase } from './application/use-cases/get-branches/get-branches-use-case.service';
import { BranchesService } from './application/services/branches/branches.service';
import { GetCommitsPerBranchUseCase } from './application/use-cases/get-commits-per-branch/get-commits-per-branch-use-case.service';
import { GetWorkflowsRunsUseCase } from './application/use-cases/get-workflowsruns/get-workflowsruns-use-case.service';
import { WorkflowsService } from './application/services/workflows/workflows.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RepositorySearchController],
  providers: [
    GetCommitsUseCase,
    CommitsService,
    GetBranchesUseCase,
    BranchesService,
    GetCommitsPerBranchUseCase,
    GetWorkflowsRunsUseCase,
    WorkflowsService
  ],
})
export class RepositorySearchModule {}

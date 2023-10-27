import { Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { GetCommitsUseCase } from '../application/use-cases/get-commits/get-commits-use-case.service';
import { IGetCommitsUseCase } from '../application/use-cases/get-commits/get-commits-use-case.interface';
import { IGetBranchesUseCase } from '../application/use-cases/get-branches/get-branches-use-case.interface';
import { GetBranchesUseCase } from '../application/use-cases/get-branches/get-branches-use-case.service';
import { IGetCommitsPerBranchUseCase } from '../application/use-cases/get-commits-per-branch/get-commits-per-branch-use-case.interface';
import { GetCommitsPerBranchUseCase } from '../application/use-cases/get-commits-per-branch/get-commits-per-branch-use-case.service';
import { GetBranchesRsDTO } from 'src/commons/domain/dtos/reponses/get-branches.interface';
import { GetCommitsRsDTO } from 'src/commons/domain/dtos/reponses/get-commits.interface';
import { GetCommitRsDTO } from 'src/commons/domain/dtos/reponses/get-commit.interface';
import { GetWorkflowsRunsRsDTO } from 'src/commons/domain/dtos/reponses/get-workflowsruns.interface';
import { GetWorkflowsRunsUseCase } from '../application/use-cases/get-workflowsruns/get-workflowsruns-use-case.service';
import { IGetWorkflowsRunsUseCase } from '../application/use-cases/get-workflowsruns/get-workflowsruns-use-case.interface';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Repository Search')
@Controller('repository-search')
export class RepositorySearchController {
  constructor(
    @Inject(GetCommitsUseCase)
    private readonly getCommitsUseCase: IGetCommitsUseCase,
    @Inject(GetBranchesUseCase)
    private readonly getBranchesUseCase: IGetBranchesUseCase,
    @Inject(GetCommitsPerBranchUseCase)
    private readonly getCommitsPerBranchUseCase: IGetCommitsPerBranchUseCase,
    @Inject(GetWorkflowsRunsUseCase)
    private readonly getWorkflowsRunsUseCase: IGetWorkflowsRunsUseCase,
    private configService: ConfigService
    ) {}

  @Get('commits')
  //@ApiQuery({ name: 'repoName', required: true, description: 'The name of the repository.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page number.', type: 'number' })
  @ApiQuery({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' })
  async getCommits(
    @Res() res,
    //@Query('repoName') repoName: string,
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
  ): Promise<void> {
    const repoName = this.configService.get<string>('API_DEFAULT_REPO');
    const response: GetCommitsRsDTO[] =
      await this.getCommitsUseCase.executeGetMany(repoName, page, per_page);
    res.reply(200, response);
  }

  @Get('branches')
  //@ApiQuery({ name: 'repoName', required: true, description: 'The name of the repository.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page number.', type: 'number' })
  @ApiQuery({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' })
  async getBranches(
    @Res() res,
    //@Query('repoName') repoName: string,
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
  ): Promise<void> {
    const repoName = this.configService.get<string>('API_DEFAULT_REPO');
    const response: GetBranchesRsDTO[] = await this.getBranchesUseCase.execute(
      repoName,
      page,
      per_page,
    );
    res.reply(200, response);
  }

  @Get('commits-per-branch')
  //@ApiQuery({ name: 'repoName', required: true, description: 'The name of the repository.' })
  @ApiQuery({ name: 'sha', required: true, description: 'The commit hash or SHA.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page number.', type: 'number' })
  @ApiQuery({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' })
  async getCommitsPerBranch(
    @Res() res,
    //@Query('repoName') repoName: string,
    @Query('sha') sha: string,
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
  ): Promise<void> {
    const repoName = this.configService.get<string>('API_DEFAULT_REPO');
    const response: GetCommitsRsDTO[] =
      await this.getCommitsPerBranchUseCase.execute(
        repoName,
        sha,
        page,
        per_page,
      );
    res.reply(200, response);
  }

  @Get('commit')
  //@ApiQuery({ name: 'repoName', required: true, description: 'The name of the repository.' })
  @ApiQuery({ name: 'sha', required: true, description: 'The commit hash or SHA.' })
  async getCommit(
    //@Query('repoName') repoName: string,
    @Query('sha') sha: string,
    @Res() res,
  ): Promise<void> {
    const repoName = this.configService.get<string>('API_DEFAULT_REPO');
    const response: GetCommitRsDTO = await this.getCommitsUseCase.executeGet(
      repoName,
      sha,
    );
    res.reply(200, response);
  }

  @Get('workflows-runs')
  //@ApiQuery({ name: 'repoName', required: true, description: 'The name of the repository.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page number.', type: 'number' })
  @ApiQuery({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' })
  async getWorkflowsRuns(
    @Res() res,
    //@Query('repoName') repoName: string,
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
  ): Promise<void> {
    const repoName = this.configService.get<string>('API_DEFAULT_REPO');
    const response: GetWorkflowsRunsRsDTO[] =
      await this.getWorkflowsRunsUseCase.execute(repoName, page, per_page);
    res.reply(200, response);
  }
}

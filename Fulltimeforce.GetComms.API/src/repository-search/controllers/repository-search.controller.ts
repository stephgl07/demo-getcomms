// src/application/adapters/controllers/commits.controller.ts

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
  ) {}

  @Get('commits') // Cambia la ruta para obtener los commits
  async getCommits(
    @Query('repoName') repoName: string,
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Res() res,
  ): Promise<void> {
    const response: GetCommitsRsDTO[] =
      await this.getCommitsUseCase.executeGetMany(repoName, page, per_page);
    res.reply(200, response);
  }

  @Get('branches') // Cambia la ruta para obtener las ramas
  async getBranches(
    @Query('repoName') repoName: string,
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Res() res,
  ): Promise<void> {
    const response: GetBranchesRsDTO[] = await this.getBranchesUseCase.execute(
      repoName,
      page,
      per_page,
    );
    res.reply(200, response);
  }

  @Get('commits-per-branch') // Cambia la ruta para obtener las ramas
  async getCommitsPerBranch(
    @Query('repoName') repoName: string,
    @Query('sha') sha: string,
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Res() res,
  ): Promise<void> {
    const response: GetCommitsRsDTO[] =
      await this.getCommitsPerBranchUseCase.execute(
        repoName,
        sha,
        page,
        per_page,
      );
    res.reply(200, response);
  }

  @Get('commit') // Cambia la ruta para obtener las ramas
  async getCommit(
    @Query('repoName') repoName: string,
    @Query('sha') sha: string,
    @Res() res,
  ): Promise<void> {
    const response: GetCommitRsDTO = await this.getCommitsUseCase.executeGet(
      repoName,
      sha,
    );
    res.reply(200, response);
  }

  @Get('workflows-runs') // Cambia la ruta para obtener las ramas
  async getWorkflowsRuns(
    @Query('repoName') repoName: string,
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Res() res,
  ): Promise<void> {
    const response: GetWorkflowsRunsRsDTO[] =
      await this.getWorkflowsRunsUseCase.execute(repoName, page, per_page);
    res.reply(200, response);
  }
}

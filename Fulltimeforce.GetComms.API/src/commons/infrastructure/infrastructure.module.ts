import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { GithubRequestHandler } from './handlers/github-api-handler/github-rq-handler.service';

@Global()
@Module({
  imports:[HttpModule],
  providers: [GithubRequestHandler],
  exports: [HttpModule, GithubRequestHandler]
})
export class InfrastructureModule {}

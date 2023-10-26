import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from './commons/infrastructure/infrastructure.module';
import { RepositorySearchModule } from './repository-search/repository-search.module';

@Module({
  imports: [ConfigModule.forRoot(), InfrastructureModule, RepositorySearchModule],
})
export class AppModule {}

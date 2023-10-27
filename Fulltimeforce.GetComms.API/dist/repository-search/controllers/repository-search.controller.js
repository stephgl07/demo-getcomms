"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorySearchController = void 0;
const common_1 = require("@nestjs/common");
const get_commits_use_case_service_1 = require("../application/use-cases/get-commits/get-commits-use-case.service");
const get_branches_use_case_service_1 = require("../application/use-cases/get-branches/get-branches-use-case.service");
const get_commits_per_branch_use_case_service_1 = require("../application/use-cases/get-commits-per-branch/get-commits-per-branch-use-case.service");
const get_workflowsruns_use_case_service_1 = require("../application/use-cases/get-workflowsruns/get-workflowsruns-use-case.service");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
let RepositorySearchController = class RepositorySearchController {
    constructor(getCommitsUseCase, getBranchesUseCase, getCommitsPerBranchUseCase, getWorkflowsRunsUseCase, configService) {
        this.getCommitsUseCase = getCommitsUseCase;
        this.getBranchesUseCase = getBranchesUseCase;
        this.getCommitsPerBranchUseCase = getCommitsPerBranchUseCase;
        this.getWorkflowsRunsUseCase = getWorkflowsRunsUseCase;
        this.configService = configService;
    }
    async getCommits(res, page, per_page) {
        const repoName = this.configService.get('API_DEFAULT_REPO');
        const response = await this.getCommitsUseCase.executeGetMany(repoName, page, per_page);
        res.reply(200, response);
    }
    async getBranches(res, page, per_page) {
        const repoName = this.configService.get('API_DEFAULT_REPO');
        const response = await this.getBranchesUseCase.execute(repoName, page, per_page);
        res.reply(200, response);
    }
    async getCommitsPerBranch(res, sha, page, per_page) {
        const repoName = this.configService.get('API_DEFAULT_REPO');
        const response = await this.getCommitsPerBranchUseCase.execute(repoName, sha, page, per_page);
        res.reply(200, response);
    }
    async getCommit(sha, res) {
        const repoName = this.configService.get('API_DEFAULT_REPO');
        const response = await this.getCommitsUseCase.executeGet(repoName, sha);
        res.reply(200, response);
    }
    async getWorkflowsRuns(res, page, per_page) {
        const repoName = this.configService.get('API_DEFAULT_REPO');
        const response = await this.getWorkflowsRunsUseCase.execute(repoName, page, per_page);
        res.reply(200, response);
    }
};
exports.RepositorySearchController = RepositorySearchController;
__decorate([
    (0, common_1.Get)('commits'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'The page number.', type: 'number' }),
    (0, swagger_1.ApiQuery)({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], RepositorySearchController.prototype, "getCommits", null);
__decorate([
    (0, common_1.Get)('branches'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'The page number.', type: 'number' }),
    (0, swagger_1.ApiQuery)({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], RepositorySearchController.prototype, "getBranches", null);
__decorate([
    (0, common_1.Get)('commits-per-branch'),
    (0, swagger_1.ApiQuery)({ name: 'sha', required: true, description: 'The commit hash or SHA.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'The page number.', type: 'number' }),
    (0, swagger_1.ApiQuery)({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('sha')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], RepositorySearchController.prototype, "getCommitsPerBranch", null);
__decorate([
    (0, common_1.Get)('commit'),
    (0, swagger_1.ApiQuery)({ name: 'sha', required: true, description: 'The commit hash or SHA.' }),
    __param(0, (0, common_1.Query)('sha')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepositorySearchController.prototype, "getCommit", null);
__decorate([
    (0, common_1.Get)('workflows-runs'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'The page number.', type: 'number' }),
    (0, swagger_1.ApiQuery)({ name: 'per_page', required: false, description: 'Items per page.', type: 'number' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], RepositorySearchController.prototype, "getWorkflowsRuns", null);
exports.RepositorySearchController = RepositorySearchController = __decorate([
    (0, swagger_1.ApiTags)('Repository Search'),
    (0, common_1.Controller)('repository-search'),
    __param(0, (0, common_1.Inject)(get_commits_use_case_service_1.GetCommitsUseCase)),
    __param(1, (0, common_1.Inject)(get_branches_use_case_service_1.GetBranchesUseCase)),
    __param(2, (0, common_1.Inject)(get_commits_per_branch_use_case_service_1.GetCommitsPerBranchUseCase)),
    __param(3, (0, common_1.Inject)(get_workflowsruns_use_case_service_1.GetWorkflowsRunsUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, config_1.ConfigService])
], RepositorySearchController);
//# sourceMappingURL=repository-search.controller.js.map
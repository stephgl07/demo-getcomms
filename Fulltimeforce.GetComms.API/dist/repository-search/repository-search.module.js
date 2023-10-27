"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorySearchModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const repository_search_controller_1 = require("./controllers/repository-search.controller");
const get_commits_use_case_service_1 = require("./application/use-cases/get-commits/get-commits-use-case.service");
const commits_service_1 = require("./application/services/commits/commits.service");
const get_branches_use_case_service_1 = require("./application/use-cases/get-branches/get-branches-use-case.service");
const branches_service_1 = require("./application/services/branches/branches.service");
const get_commits_per_branch_use_case_service_1 = require("./application/use-cases/get-commits-per-branch/get-commits-per-branch-use-case.service");
const get_workflowsruns_use_case_service_1 = require("./application/use-cases/get-workflowsruns/get-workflowsruns-use-case.service");
const workflows_service_1 = require("./application/services/workflows/workflows.service");
let RepositorySearchModule = class RepositorySearchModule {
};
exports.RepositorySearchModule = RepositorySearchModule;
exports.RepositorySearchModule = RepositorySearchModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        controllers: [repository_search_controller_1.RepositorySearchController],
        providers: [
            get_commits_use_case_service_1.GetCommitsUseCase,
            commits_service_1.CommitsService,
            get_branches_use_case_service_1.GetBranchesUseCase,
            branches_service_1.BranchesService,
            get_commits_per_branch_use_case_service_1.GetCommitsPerBranchUseCase,
            get_workflowsruns_use_case_service_1.GetWorkflowsRunsUseCase,
            workflows_service_1.WorkflowsService
        ],
    })
], RepositorySearchModule);
//# sourceMappingURL=repository-search.module.js.map
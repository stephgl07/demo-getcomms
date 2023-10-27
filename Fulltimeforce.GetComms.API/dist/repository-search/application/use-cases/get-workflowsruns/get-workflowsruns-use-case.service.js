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
exports.GetWorkflowsRunsUseCase = void 0;
const common_1 = require("@nestjs/common");
const workflows_service_1 = require("../../services/workflows/workflows.service");
const dateFormatter_1 = require("../../../../utils/dateFormatter");
let GetWorkflowsRunsUseCase = class GetWorkflowsRunsUseCase {
    constructor(workflowService) {
        this.workflowService = workflowService;
    }
    async execute(repoName, page, per_page) {
        let workflowsRoot = await this.workflowService.getWorkflows(repoName);
        workflowsRoot.workflows = workflowsRoot.workflows.filter((workflow) => {
            return repoName == workflow.url.split('/')[5];
        });
        const mappedWorkflows = await Promise.all(workflowsRoot.workflows.map(async (workflow) => {
            const runs = await this.workflowService.getWorkflowsRuns(repoName, workflow.id.toString(), page, per_page);
            const mappedRuns = runs.workflow_runs.map((run) => {
                return {
                    head_branch: run.head_branch,
                    head_sha: run.head_sha,
                    display_title: run.display_title,
                    run_number: run.run_number,
                    status: run.status,
                    conclusion: run.conclusion,
                    html_url: run.html_url,
                    date_created: (0, dateFormatter_1.formatDate)(run.created_at),
                    duration: (0, dateFormatter_1.calculateTime)(run.created_at, run.updated_at),
                    actor: {
                        avatar_url: run.actor.avatar_url,
                        user_name: run.actor.login,
                        url: run.actor.url,
                        html_url: run.actor.html_url,
                    },
                    run_attempt: run.run_attempt,
                    head_commit_message: run.head_commit.message,
                };
            });
            const mappedWorkflow = {
                id: workflow.id,
                name: workflow.name,
                state: workflow.state,
                runs: mappedRuns,
            };
            return mappedWorkflow;
        }));
        return mappedWorkflows;
    }
};
exports.GetWorkflowsRunsUseCase = GetWorkflowsRunsUseCase;
exports.GetWorkflowsRunsUseCase = GetWorkflowsRunsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(workflows_service_1.WorkflowsService)),
    __metadata("design:paramtypes", [Object])
], GetWorkflowsRunsUseCase);
//# sourceMappingURL=get-workflowsruns-use-case.service.js.map
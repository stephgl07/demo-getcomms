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
exports.GetCommitsPerBranchUseCase = void 0;
const common_1 = require("@nestjs/common");
const commits_service_1 = require("../../services/commits/commits.service");
const branches_service_1 = require("../../services/branches/branches.service");
const dateFormatter_1 = require("../../../../utils/dateFormatter");
let GetCommitsPerBranchUseCase = class GetCommitsPerBranchUseCase {
    constructor(commitsService, branchesService) {
        this.commitsService = commitsService;
        this.branchesService = branchesService;
    }
    async execute(repoName, sha, page, per_page) {
        const commits = await this.commitsService.getCommitsPerBranch(repoName, sha, page, per_page);
        const branches = await this.branchesService.getBranches(repoName);
        const mappedCommits = commits.map(comm => ({
            sha: comm.sha,
            commit: {
                author: {
                    name: comm.commit.author.name,
                    email: comm.commit.author.email,
                    user_name: comm.author.login,
                    avatar_url: comm.author.avatar_url,
                    date: (0, dateFormatter_1.formatDate)(comm.commit.author.date),
                    html_url: comm.author.html_url,
                },
                message: comm.commit.message,
                comment_count: comm.commit.comment_count,
                verification: {
                    verified: comm.commit.verification.verified,
                    reason: comm.commit.verification.reason,
                },
                is_head: branches.some(branch => branch.commit.sha == comm.sha),
                branch_head: branches.find(branch => branch.commit.sha == comm.sha)?.name
            },
            html_url: comm.html_url,
            parents: comm.parents.map(parent => ({
                sha: parent.sha,
                html_url: parent.html_url,
            })),
        }));
        return mappedCommits;
    }
};
exports.GetCommitsPerBranchUseCase = GetCommitsPerBranchUseCase;
exports.GetCommitsPerBranchUseCase = GetCommitsPerBranchUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(commits_service_1.CommitsService)),
    __param(1, (0, common_1.Inject)(branches_service_1.BranchesService)),
    __metadata("design:paramtypes", [Object, Object])
], GetCommitsPerBranchUseCase);
//# sourceMappingURL=get-commits-per-branch-use-case.service.js.map
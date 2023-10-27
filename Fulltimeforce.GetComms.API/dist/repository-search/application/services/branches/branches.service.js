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
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const github_rq_handler_service_1 = require("../../../../commons/infrastructure/handlers/github-api-handler/github-rq-handler.service");
let BranchesService = class BranchesService {
    constructor(githubRequestHandler, configService) {
        this.githubRequestHandler = githubRequestHandler;
        this.configService = configService;
    }
    async getBranches(repoName, page, per_page) {
        const baseUrl = this.configService.get('API_BASE_URL');
        const user = this.configService.get('API_USER');
        const token = this.configService.get('API_TOKEN');
        const headers = {};
        if (user && token) {
            headers['Authorization'] = `Basic ${token}`;
        }
        const params = { repoName };
        if (page != null && per_page != null) {
            params.page = page;
            params.per_page = per_page;
        }
        const response = await this.githubRequestHandler.Get(`${baseUrl}/repos/${user}/${repoName}/branches`, {
            headers,
            params
        });
        return response.data;
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(github_rq_handler_service_1.GithubRequestHandler)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], BranchesService);
//# sourceMappingURL=branches.service.js.map
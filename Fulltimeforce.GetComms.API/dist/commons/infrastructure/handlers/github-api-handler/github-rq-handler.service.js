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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubRequestHandler = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const github_exceptions_1 = require("../../../domain/dtos/api/github-exceptions");
let GithubRequestHandler = class GithubRequestHandler {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger('GithubAPI');
    }
    async Get(url, config) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, config));
            this.logger.log("Github API call: " + url + " - " + response.status + " - " + response.statusText);
            if ((response.status === common_1.HttpStatus.NOT_FOUND))
                throw new github_exceptions_1.GitHubNotFoundException();
            if ((response.status === common_1.HttpStatus.UNPROCESSABLE_ENTITY))
                throw new github_exceptions_1.GitHubUnprocessableEntityException();
            return response;
        }
        catch (error) {
            this.logger.error(error.response.data);
            throw new github_exceptions_1.GitHubApiException('Error while processing the request');
        }
    }
};
exports.GithubRequestHandler = GithubRequestHandler;
exports.GithubRequestHandler = GithubRequestHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GithubRequestHandler);
//# sourceMappingURL=github-rq-handler.service.js.map
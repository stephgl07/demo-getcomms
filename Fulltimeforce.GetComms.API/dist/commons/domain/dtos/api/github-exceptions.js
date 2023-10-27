"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubRateLimitException = exports.GitHubUnprocessableEntityException = exports.GitHubNotFoundException = exports.GitHubApiException = void 0;
const common_1 = require("@nestjs/common");
class GitHubApiException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.GitHubApiException = GitHubApiException;
class GitHubNotFoundException extends common_1.HttpException {
    constructor() {
        super('Recurso no encontrado en GitHub', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.GitHubNotFoundException = GitHubNotFoundException;
class GitHubUnprocessableEntityException extends common_1.HttpException {
    constructor() {
        super('Recurso no procesable en GitHub', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.GitHubUnprocessableEntityException = GitHubUnprocessableEntityException;
class GitHubRateLimitException extends common_1.HttpException {
    constructor() {
        super('Se ha alcanzado el límite de peticiones a la API de GitHub', common_1.HttpStatus.TOO_MANY_REQUESTS);
    }
}
exports.GitHubRateLimitException = GitHubRateLimitException;
//# sourceMappingURL=github-exceptions.js.map
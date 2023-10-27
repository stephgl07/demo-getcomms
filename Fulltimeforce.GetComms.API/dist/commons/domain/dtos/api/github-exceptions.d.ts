import { HttpException } from '@nestjs/common';
export declare class GitHubApiException extends HttpException {
    constructor(message: string);
}
export declare class GitHubNotFoundException extends HttpException {
    constructor();
}
export declare class GitHubUnprocessableEntityException extends HttpException {
    constructor();
}
export declare class GitHubRateLimitException extends HttpException {
    constructor();
}

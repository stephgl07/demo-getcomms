import { HttpException, HttpStatus } from '@nestjs/common';

export class GitHubApiException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class GitHubNotFoundException extends HttpException {
  constructor() {
    super('Recurso no encontrado en GitHub', HttpStatus.NOT_FOUND);
  }
}

export class GitHubUnprocessableEntityException extends HttpException {
  constructor() {
    super('Recurso no procesable en GitHub', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class GitHubRateLimitException extends HttpException {
  constructor() {
    super(
      'Se ha alcanzado el límite de peticiones a la API de GitHub',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}

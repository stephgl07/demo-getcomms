import { HttpException } from "@nestjs/common";
import { ApiResponse } from "src/commons/domain/dtos/api/api-global-response";

export function responseFormatMiddleware<T>(req: any, res: any, next: () => void) {

  res.reply = (statusCode: number, data: T) => {
    const apiResponse: ApiResponse<T> = {
        statusCode,
        data
    }
    res.status(statusCode).json(apiResponse);
  };

  next();
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

export interface ApiResponseError {
  statusCode: number;
  error: string;
}
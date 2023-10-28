import { Get } from "@/common/infrastructure/handlers/api-requests";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetCommitsRsDTO } from "@/common/domain/get-commits.interface";

export const fetchCommitsDashboard = async (page?: number, per_page?: number): Promise<ApiResponse<GetCommitsRsDTO[]>> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/repository-search/commits`;
  const response = await Get<ApiResponse<GetCommitsRsDTO[]>>(`${baseUrl}`, {
    params: { page, per_page }
  });
  return response.data;
}

export const fetchCommitsPerBranch = async (sha: string, page?: number, per_page?: number): Promise<ApiResponse<GetCommitsRsDTO[]>> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/repository-search/commits-per-branch`;
  const response = await Get<ApiResponse<GetCommitsRsDTO[]>>(`${baseUrl}`, {
    params: { sha, page, per_page }
  });
  return response.data;
}

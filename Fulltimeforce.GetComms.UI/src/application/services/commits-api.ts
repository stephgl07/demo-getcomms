import { Get } from "@/common/infrastructure/handlers/api-requests";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetCommitsRsDTO } from "@/common/domain/get-commits.interface";

export const fetchCommitsDashboard = async (repoName: string, page?: number, per_page?: number): Promise<ApiResponse<GetCommitsRsDTO[]>> => {
  console.log("baseurl", process.env.NEXT_PUBLIC_BASE_API_URL)
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/repository-search/commits`;
  const response = await Get<ApiResponse<GetCommitsRsDTO[]>>(`${baseUrl}`, {
    params: { repoName, page, per_page }
  });
  return response.data;
}

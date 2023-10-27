import { Get } from "@/common/infrastructure/handlers/api-requests";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";

export const fetchBranchesDashboard = async (page?: number, per_page?: number): Promise<ApiResponse<GetBranchesRsDTO[]>> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/repository-search/branches`;
  const response = await Get<ApiResponse<GetBranchesRsDTO[]>>(`${baseUrl}`, {
    params: { page, per_page }
  });
  return response.data;
}

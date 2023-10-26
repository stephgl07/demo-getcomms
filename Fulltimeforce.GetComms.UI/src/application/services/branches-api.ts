// src/services/api/dashboardApi.ts

import { Get } from "@/common/infrastructure/handlers/api-requests";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";

export const fetchBranches = async (repoName: string, page: number = 1, per_page: number = 100): Promise<ApiResponse<GetBranchesRsDTO[]>> => {
  console.log("baseurl", process.env.NEXT_PUBLIC_BASE_API_URL)
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/repository-search/branches`;
  const response = await Get<ApiResponse<GetBranchesRsDTO[]>>(`${baseUrl}`, {
    params: { repoName, page, per_page }
  });
  return response.data;
}

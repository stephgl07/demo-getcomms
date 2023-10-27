import { Get } from "@/common/infrastructure/handlers/api-requests";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetWorkflowsRunsRsDTO } from "@/common/domain/get-workflowsruns.interface";

export const fetchWorkflowsDashboard = async (page?: number, per_page?: number): Promise<ApiResponse<GetWorkflowsRunsRsDTO[]>> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/repository-search/workflows-runs`;
  const response = await Get<ApiResponse<GetWorkflowsRunsRsDTO[]>>(`${baseUrl}`, {
    params: { page, per_page }
  });
  return response.data;
}

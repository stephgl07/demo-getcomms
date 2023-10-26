export interface GetWorkflowsRunsRsDTO {
    name: string;
    id: number;
    state: string;
    runs: GetWorkflowsRunsDTO[]
}
  
export interface GetWorkflowsRunsDTO{
    head_branch: string;
    head_sha: string;
    display_title: string;
    run_number: number;
    status: string;
    conclusion: string;
    html_url: string;
    date_created: string;
    duration: string;
    actor:{
        avatar_url: string;
        user_name: string;
        url: string;
        html_url: string;

    },
    run_attempt: number;
    head_commit_message: string;
}
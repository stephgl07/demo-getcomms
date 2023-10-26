export interface GetCommitsRsDTO {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      user_name: string;
      avatar_url: string;
      date: string;
      html_url: string;
    };
    message: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
    };
    is_head: boolean;
    branch_head?: string;
  };
  html_url: string;
  parents: {
    sha: string;
    html_url: string;
  }[];
}

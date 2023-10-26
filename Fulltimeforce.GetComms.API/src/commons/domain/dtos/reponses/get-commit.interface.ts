export interface GetCommitRsDTO {
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
  };
  html_url: string;
  parents: {
    sha: string;
    html_url: string;
  }[];
  stats: {
    total: number,
    additions: number,
    deletions: number
  },
  files: {
    sha: string;
    filename: string;
    status: string;
    additions: number,
    deletions: number,
    changes: number,
    contents_url: string;
    patch: string;
  }[]
}

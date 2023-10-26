export interface WorkFlowRunEntity {
    total_count: number
    workflow_runs: WorkflowRun[]
  }
  
  export interface WorkflowRun {
    id: number
    name: string
    node_id: string
    head_branch: string
    head_sha: string
    path: string
    display_title: string
    run_number: number
    event: string
    status: string
    conclusion: string
    workflow_id: number
    check_suite_id: number
    check_suite_node_id: string
    url: string
    html_url: string
    pull_requests: any[]
    created_at: string
    updated_at: string
    actor: Actor
    run_attempt: number
    referenced_workflows: any[]
    run_started_at: string
    triggering_actor: TriggeringActor
    jobs_url: string
    logs_url: string
    check_suite_url: string
    artifacts_url: string
    cancel_url: string
    rerun_url: string
    previous_attempt_url: any
    workflow_url: string
    head_commit: HeadCommit
    repository: Repository
    head_repository: HeadRepository
  }
  
  export interface Actor {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  
  export interface TriggeringActor {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  
  export interface HeadCommit {
    id: string
    tree_id: string
    message: string
    timestamp: string
    author: Author
    committer: Committer
  }
  
  export interface Author {
    name: string
    email: string
  }
  
  export interface Committer {
    name: string
    email: string
  }
  
  export interface Repository {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: Owner
    html_url: string
    description: string
    fork: boolean
    url: string
    forks_url: string
    keys_url: string
    collaborators_url: string
    teams_url: string
    hooks_url: string
    issue_events_url: string
    events_url: string
    assignees_url: string
    branches_url: string
    tags_url: string
    blobs_url: string
    git_tags_url: string
    git_refs_url: string
    trees_url: string
    statuses_url: string
    languages_url: string
    stargazers_url: string
    contributors_url: string
    subscribers_url: string
    subscription_url: string
    commits_url: string
    git_commits_url: string
    comments_url: string
    issue_comment_url: string
    contents_url: string
    compare_url: string
    merges_url: string
    archive_url: string
    downloads_url: string
    issues_url: string
    pulls_url: string
    milestones_url: string
    notifications_url: string
    labels_url: string
    releases_url: string
    deployments_url: string
  }
  
  export interface Owner {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  
  export interface HeadRepository {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: Owner2
    html_url: string
    description: string
    fork: boolean
    url: string
    forks_url: string
    keys_url: string
    collaborators_url: string
    teams_url: string
    hooks_url: string
    issue_events_url: string
    events_url: string
    assignees_url: string
    branches_url: string
    tags_url: string
    blobs_url: string
    git_tags_url: string
    git_refs_url: string
    trees_url: string
    statuses_url: string
    languages_url: string
    stargazers_url: string
    contributors_url: string
    subscribers_url: string
    subscription_url: string
    commits_url: string
    git_commits_url: string
    comments_url: string
    issue_comment_url: string
    contents_url: string
    compare_url: string
    merges_url: string
    archive_url: string
    downloads_url: string
    issues_url: string
    pulls_url: string
    milestones_url: string
    notifications_url: string
    labels_url: string
    releases_url: string
    deployments_url: string
  }
  
  export interface Owner2 {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  
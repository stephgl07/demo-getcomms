export type Root = BranchEntity[]

export interface BranchEntity {
  name: string
  commit: Commit
  protected: boolean
}

export interface Commit {
  sha: string
  url: string
}
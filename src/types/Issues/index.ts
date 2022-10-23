export interface IssueDTO {
  id: string;
  title: string;
  number: number;
  assignee: string;
  commentCount: number;
  createdBy: string;
  createdDate: string;
  labels: string;
  status: string;
}

export interface IssuesListDTO {
  items: Array<IssueDTO>;
}

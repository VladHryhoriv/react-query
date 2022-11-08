import { Issue } from 'enities/Issue.entity';

export type IssueStatus =
  | 'backlog'
  | 'todo'
  | 'in-progress'
  | 'done'
  | 'cancelled';

export interface IssueDTO {
  id: string;
  title: string;
  number: number;
  assignee: string;
  commentCount: number;
  createdBy: string;
  createdDate: Date;
  labels: Array<string>;
  status: IssueStatus;
}

export interface IssuesListDTO {
  items: Array<Issue>;
}

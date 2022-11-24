import { Issue } from 'enities/Issue.entity';

export type IssueDTO = {
  labels: Array<string>;
  assignee: string;
  createdBy: string;
} & Omit<Issue, 'labels' | 'assignee' | 'createdBy'>;

export interface IssuesRequestParams {
  search?: string;
  label?: string[];
  status?: string;
}
export interface IssueRequestParms {
  number: number;
  page?: number;
  limit?: number;
}

export type TIssueStatus =
  | 'backlog'
  | 'todo'
  | 'inProgress'
  | 'done'
  | 'cancelled';

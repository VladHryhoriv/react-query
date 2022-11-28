import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';

export type IssueDTO = {
  labels: Array<string>;
  assignee: string;
  createdBy: string;
} & Omit<Issue, 'labels' | 'assignee' | 'createdBy'>;

export interface IssuesRequestParams {
  search: string;
  labels: string[];
  status: string;
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

export type UpdateIssueParams = {
  assignee?: string;
  status?: string;
  labels?: Array<Label['id']>;
};

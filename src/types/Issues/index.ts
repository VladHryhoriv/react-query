import { Issue } from 'enities/Issue.entity';

export type IssueDTO = {
  labels: Array<string>;
  assignee: string;
  createdBy: string;
} & Omit<Issue, 'labels' | 'assignee' | 'createdBy'>;

export interface IssueRequestParms {
  number: number;
  page?: number;
  limit?: number;
}

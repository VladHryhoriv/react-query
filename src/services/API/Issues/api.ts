import { Issue } from 'enities/Issue.entity';
import { api } from 'utils/APIHandler';

export const fetchIssues = (): Promise<Issue[]> => {
  return api<Issue[]>('/api/issues');
};

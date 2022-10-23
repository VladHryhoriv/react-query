import { IssuesListDTO } from 'types/Issues';
import { api } from 'utils/APIHandler';

export const fetchIssues = (): Promise<IssuesListDTO> => {
  return api<IssuesListDTO>('/api/issues');
};

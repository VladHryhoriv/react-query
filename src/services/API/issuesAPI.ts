import { Comment } from 'enities/Comment.entity';
import queryString from 'query-string';
import { IssueDTO, IssueRequestParms } from 'types/Issues';
import { api } from 'utils/APIHandler';

const isMockAPI: boolean = !!process.env.REACT_IS_MOCK_API;

const issues: IssueDTO[] = require('../../mocks/data/issues.json');

export const fetchIssues = (): Promise<IssueDTO[]> => {
  if (isMockAPI) {
    return Promise.resolve(issues);
  }

  return api<IssueDTO[]>('/api/issues');
};

export const fetchIssueComments = (
  params: IssueRequestParms
): Promise<Comment[]> => {
  const { number } = params;

  const requestParams = queryString.stringify(params);

  return api<Comment[]>(`/api/issues/${number}/comments?${requestParams}`);
};

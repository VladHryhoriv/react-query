import { Issue } from 'enities/Issue.entity';
import queryString from 'query-string';
import { CommentDTO } from 'types/Comment';
import { IssueDTO, IssueRequestParms, IssuesRequestParams } from 'types/Issues';
import { api } from 'utils/APIHandler';

const isMockAPI: boolean = !!process.env.REACT_IS_MOCK_API;

const issues: IssueDTO[] = require('../../mocks/data/issues.json');

export const fetchIssues = (
  params: IssuesRequestParams
): Promise<IssueDTO[]> => {
  if (isMockAPI) {
    return Promise.resolve(issues);
  }

  const requestParams = queryString.stringify(params, {
    skipEmptyString: true,
    skipNull: true
  });

  return api<IssueDTO[]>(`/api/issues${requestParams && `?${requestParams}`}`);
};

export const fetchIssue = (number: Issue['number']): Promise<IssueDTO> => {
  return api<IssueDTO>(`/api/issues/${number}`);
};

export const fetchIssueComments = (
  params: IssueRequestParms
): Promise<CommentDTO[]> => {
  const { number } = params;

  const requestParams = queryString.stringify(params);

  return api<CommentDTO[]>(`/api/issues/${number}/comments?${requestParams}`);
};

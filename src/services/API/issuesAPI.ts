import { Issue } from 'enities/Issue.entity';
import queryString from 'query-string';
import { CommentDTO } from 'types/Comment';
import {
  IssueDTO,
  IssueRequestParms,
  IssuesRequestParams,
  UpdateAssigmentParams,
  UpdateStatusParams
} from 'types/Issues';
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
    skipNull: true,
    arrayFormat: 'bracket'
  });

  return api.get<IssueDTO[]>(
    `/api/issues${requestParams && `?${requestParams}`}`
  );
};

export const fetchIssue = (number: Issue['number']): Promise<IssueDTO> => {
  return api.get<IssueDTO>(`/api/issues/${number}`);
};

export const fetchIssueComments = (
  params: IssueRequestParms
): Promise<CommentDTO[]> => {
  const { number } = params;

  const requestParams = queryString.stringify(params);

  return api.get<CommentDTO[]>(
    `/api/issues/${number}/comments?${requestParams}`
  );
};

export const fetchUpdateIssueStatus = (
  id: Issue['number'],
  body: UpdateStatusParams
): Promise<IssueDTO> => {
  return api.put<UpdateStatusParams, IssueDTO>(`/api/issues/${id}`, body);
};

export const fetchUpdateIssueAssignment = (
  id: Issue['number'],
  body: UpdateAssigmentParams
): Promise<IssueDTO> => {
  return api.put<UpdateAssigmentParams, IssueDTO>(`/api/issues/${id}`, body);
};

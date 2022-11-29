import { Issue } from 'enities/Issue.entity';
import queryString from 'query-string';
import { CommentDTO } from 'types/Comment';
import {
  AddIssueParams,
  IssueDTO,
  IssueRequestParms,
  IssuesRequestParams,
  UpdateIssueParams
} from 'types/Issues';
import { api } from 'utils/APIHandler';

const isMockAPI: boolean = !!process.env.REACT_IS_MOCK_API;

const issues: IssueDTO[] = require('../../mocks/data/issues.json');

export const fetchIssues = (
  params?: IssuesRequestParams
): Promise<IssueDTO[]> => {
  if (isMockAPI) {
    return Promise.resolve(issues);
  }

  const requestParams = queryString.stringify(params || {}, {
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

export const fetchUpdateIssue = (
  id: Issue['number'],
  body: UpdateIssueParams
): Promise<IssueDTO> => {
  return api.put<UpdateIssueParams, IssueDTO>(`/api/issues/${id}`, body);
};

export const fetchAddIssue = (body: AddIssueParams): Promise<IssueDTO> => {
  return api.post<AddIssueParams, IssueDTO>('api/issues', body);
};

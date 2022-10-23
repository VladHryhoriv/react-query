import { useQuery, UseQueryResult } from 'react-query';
import { issueKeys } from 'enums/queries';
import { fetchIssues } from 'services/API/Issues/api';
import { IssuesListDTO } from 'types/Issues';

export const useIssues = (): UseQueryResult<IssuesListDTO, Error> => {
  const data = useQuery<IssuesListDTO, Error>(issueKeys.root, fetchIssues);

  return data;
};

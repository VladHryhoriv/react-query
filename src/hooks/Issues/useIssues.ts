import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Issue } from 'enities/Issue.entity';
import { issueKeys } from 'enums/queries';
import { fetchIssues } from 'services/API/Issues/api';

export const useIssues = (
  options?: Omit<UseQueryOptions<Issue[], Error>, 'queruKey' | 'queryFn'>
): UseQueryResult<Issue[], Error> => {
  const data = useQuery<Issue[], Error>(
    issueKeys.root,
    async () => {
      const issues = await fetchIssues();

      return Issue.deserializeAsArray(issues);
    },
    {
      retry: 1,
      ...options
    }
  );

  return data;
};

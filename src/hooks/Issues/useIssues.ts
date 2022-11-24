import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';
import { User } from 'enities/User.entity';
import { issueKeys, labelsKeys, userKeys } from 'enums/queries';
import { fetchIssues } from 'services/API';
import { queryClient } from 'utils/queryClient';

export const useIssues = (
  options?: Omit<UseQueryOptions<Issue[], Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<Issue[], Error> => {
  const data = useQuery<Issue[], Error>(
    issueKeys.root,
    async () => {
      const issues = await fetchIssues();
      const users = queryClient.getQueryData<
        ReturnType<typeof User.deserializeAsMap>
      >(userKeys.root);
      const labels = queryClient.getQueryData<
        ReturnType<typeof Label.deserializeAsMap>
      >(labelsKeys.root);

      return Issue.deserializeAsArray(
        issues.map((issue) => ({
          ...issue,
          assignee: users?.get(issue.assignee) as User,
          createdBy: users?.get(issue.createdBy) as User,
          labels: issue.labels.map((l) => labels?.get(l)) as Label[]
        }))
      );
    },
    {
      retry: 1,
      ...options
    }
  );

  return data;
};

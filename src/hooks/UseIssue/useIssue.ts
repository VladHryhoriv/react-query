import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';
import { User } from 'enities/User.entity';
import { issueKeys, labelsKeys, userKeys } from 'enums/queries';
import { fetchIssue } from 'services/API';
import { queryClient } from 'utils/queryClient';

export const useIssue = (
  number: Issue['number'],
  options?: Omit<UseQueryOptions<Issue, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<Issue, Error> => {
  const data = useQuery<Issue, Error>(
    issueKeys.issue(number),
    async () => {
      const issueData = await fetchIssue(number);

      const users = queryClient.getQueryData<
        ReturnType<typeof User.deserializeAsMap>
      >(userKeys.root);
      const labels = queryClient.getQueryData<
        ReturnType<typeof Label.deserializeAsMap>
      >(labelsKeys.root);

      const issue = Issue.deserialize({
        ...issueData,
        assignee: users?.get(issueData.assignee) as User,
        createdBy: users?.get(issueData.createdBy) as User,
        labels: issueData.labels.map((l) => labels?.get(l)) as Label[]
      });

      return issue;
    },
    { ...options, retry: 1 }
  );

  return data;
};

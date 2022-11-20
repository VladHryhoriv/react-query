import {
  QueryClient,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from 'react-query';
import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';
import { User } from 'enities/User.entity';
import { issueKeys, labelsKeys } from 'enums/queries';
import { fetchIssues, fetchLabels } from 'services/API';
import { fetchAllUsers } from 'services/API/uesrAPI';

export const useIssues = (
  options?: Omit<UseQueryOptions<Issue[], Error>, 'queruKey' | 'queryFn'>
): UseQueryResult<Issue[], Error> => {
  const client = new QueryClient();
  const data = useQuery<Issue[], Error>(
    issueKeys.root,
    async () => {
      const issues = await fetchIssues();
      const labelsData = await fetchLabels();
      const usersData = await fetchAllUsers();

      client.setQueryData<Label[]>(
        labelsKeys.root,
        Label.deserializeAsArray(labelsData)
      );

      const labels = Label.deserializeAsMap(labelsData);
      const users = User.deserializeAsMap(usersData);

      return Issue.deserializeAsArray(
        issues.map((issue) => ({
          ...issue,
          assignee: users.get(issue.assignee) as User,
          createdBy: users.get(issue.createdBy) as User,
          labels: issue.labels.map((l) => labels.get(l)) as Label[]
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

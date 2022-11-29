import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { paths } from 'config/paths';
import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';
import { User } from 'enities/User.entity';
import { issueKeys, labelsKeys, userKeys } from 'enums/queries';
import { fetchAddIssue } from 'services/API';
import { AddIssueParams } from 'types/Issues';
import { queryClient } from 'utils/queryClient';

export const useAddIssue = (): UseMutationResult<
  Issue,
  Error,
  AddIssueParams,
  Issue
> => {
  const navigate = useNavigate();
  const mutation = useMutation<Issue, Error, AddIssueParams, Issue>(
    async (params) => {
      const issueData = await fetchAddIssue(params);

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

      queryClient.setQueriesData(issueKeys.issue(issue.number), issue);

      return issue;
    },
    {
      onSuccess: ({ number }) => {
        toast.success('Issue was added!');
        navigate(paths.issue(number));
      },
      onError: () => {
        toast.error('Fail to add issue!');
        navigate(paths.issues());
      }
    }
  );

  return mutation;
};

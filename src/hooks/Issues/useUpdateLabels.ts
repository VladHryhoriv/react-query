import { useMutation, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';
import { issueKeys } from 'enums/queries';
import { fetchUpdateIssueLabels } from 'services/API';
import { IssueDTO } from 'types/Issues';
import { queryClient } from 'utils/queryClient';

type MutationParams = {
  labels: Array<Label['id']>;
  id: Issue['number'];
};

export const useUpdateLabels = (): UseMutationResult<
  IssueDTO,
  Error,
  MutationParams,
  IssueDTO
> => {
  return useMutation(
    async ({ id, labels }) => {
      return await fetchUpdateIssueLabels(id, { labels });
    },
    {
      onSuccess: (_data, variables) => {
        toast.success('Successfully updated !)');
        queryClient.invalidateQueries(issueKeys.issue(variables.id));
      },
      onError: () => {
        toast.error('Fail to update issue labels(');
      }
    }
  );
};

import { useMutation, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import { Issue } from 'enities/Issue.entity';
import { issueKeys } from 'enums/queries';
import { fetchUpdateIssue } from 'services/API';
import { IssueDTO, UpdateIssueParams } from 'types/Issues';
import { queryClient } from 'utils/queryClient';

type MutationParams = {
  params: UpdateIssueParams;
  id: Issue['number'];
};

export const useIssueUpdate = (): UseMutationResult<
  IssueDTO,
  Error,
  MutationParams,
  IssueDTO
> => {
  return useMutation(
    async ({ id, params }) => {
      return await fetchUpdateIssue(id, params);
    },
    {
      onSuccess: (_data, variables) => {
        toast.success('Successfully updated !)');
        queryClient.invalidateQueries(issueKeys.issue(variables.id));
      },
      onError: () => {
        toast.error('Fail to update issue(');
      }
    }
  );
};

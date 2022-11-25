import { useMutation, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import { Issue } from 'enities/Issue.entity';
import { issueKeys } from 'enums/queries';
import { fetchUpdateIssueStatus } from 'services/API';
import { IssueDTO, UpdateStatusParams } from 'types/Issues';
import { queryClient } from 'utils/queryClient';

type TParams = {
  id: Issue['number'];
} & UpdateStatusParams;

export const useUpdateStatus = (): UseMutationResult<
  IssueDTO,
  Error,
  TParams,
  IssueDTO
> => {
  return useMutation(
    async ({ id, status }) => {
      return await fetchUpdateIssueStatus(id, { status });
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(issueKeys.issue(variables.id));
        toast.success('Issue status updated !');
      },
      onError: () => {
        toast.error('Fail to update issue status(');
      }
    }
  );
};

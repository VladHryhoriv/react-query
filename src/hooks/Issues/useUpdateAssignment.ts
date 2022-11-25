import { useMutation, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import { Issue } from 'enities/Issue.entity';
import { User } from 'enities/User.entity';
import { issueKeys } from 'enums/queries';
import { fetchUpdateIssueAssignment } from 'services/API';
import { IssueDTO } from 'types/Issues';
import { queryClient } from 'utils/queryClient';

type MutationParams = {
  assignee: User['id'];
  id: Issue['number'];
};

export const useUpdateAssignment = (): UseMutationResult<
  IssueDTO,
  Error,
  MutationParams,
  IssueDTO
> => {
  return useMutation(
    async ({ id, assignee }) => {
      return await fetchUpdateIssueAssignment(id, { assignee });
    },
    {
      onSuccess: (_data, variables) => {
        toast.success('Successfully updated !)');
        queryClient.invalidateQueries(issueKeys.issue(variables.id));
      },
      onError: () => {
        toast.error('Fail to update issue assignment(');
      }
    }
  );
};

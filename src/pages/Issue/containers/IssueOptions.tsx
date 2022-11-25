import { FC } from 'react';
import { Label } from 'enities/Label.entity';
import { User } from 'enities/User.entity';
import { useIssue } from 'hooks/Issues/useIssue';
import { useUpdateAssignment } from 'hooks/Issues/useUpdateAssignment';
import { useUpdateLabels } from 'hooks/Issues/useUpdateLabels';
import { useUpdateStatus } from 'hooks/Issues/useUpdateStatus';
import { StatusList } from 'pages/Issues/container/StatusList';

import { IssueAssignment } from './IssueAssignment';
import { IssueLabels } from './IssueLabels';

type TProps = {
  issue?: string;
};

export const IssueOptions: FC<TProps> = ({ issue }) => {
  const { data, isLoading } = useIssue(Number(issue));
  const statusMutate = useUpdateStatus();
  const assigneeMutate = useUpdateAssignment();
  const labelsMutate = useUpdateLabels();

  const handleSetStaus = (status: React.ChangeEvent<HTMLSelectElement>) => {
    statusMutate.mutate({
      id: Number(data?.number),
      status: status.target.value
    });
  };
  const handleSetAssignee = (assignee: User['id']) => {
    assigneeMutate.mutate({ id: Number(data?.number), assignee });
  };
  const handleSetLabels = (labels: Array<Label['id']>) => {
    labelsMutate.mutate({ id: Number(data?.number), labels });
  };

  if (isLoading || !data) {
    return (
      <aside>
        <p>Loading...</p>
      </aside>
    );
  }

  return (
    <aside>
      <div className='issue-options'>
        <div>
          <StatusList onClick={handleSetStaus} selected={data.status} />
        </div>
      </div>
      <IssueAssignment user={data.assignee} onClick={handleSetAssignee} />
      <IssueLabels onClick={handleSetLabels} issueLabels={data.labels} />
    </aside>
  );
};

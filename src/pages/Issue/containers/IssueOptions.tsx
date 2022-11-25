import { FC } from 'react';
import { User } from 'enities/User.entity';
import { useIssue } from 'hooks/Issues/useIssue';
import { useUpdateAssignment } from 'hooks/Issues/useUpdateAssignment';
import { useUpdateStatus } from 'hooks/Issues/useUpdateStatus';
import { StatusList } from 'pages/Issues/container/StatusList';

import { IssueAssignment } from './IssueAssignment';

type TProps = {
  issue?: string;
};

export const IssueOptions: FC<TProps> = ({ issue }) => {
  const { data, isLoading } = useIssue(Number(issue));
  const statusMutate = useUpdateStatus();
  const assigneeMutate = useUpdateAssignment();

  const handleSetStaus = (status: React.ChangeEvent<HTMLSelectElement>) => {
    statusMutate.mutate({
      id: Number(data?.number),
      status: status.target.value
    });
  };
  const handleSetAssignee = (id: User['id']) => {
    assigneeMutate.mutate({ id: Number(data?.number), assignee: id });
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
      {/* {!!issueDetails.data && (
            <IssueLabels
              labels={issueDetails.data.labels}
              issueNumber={issueDetails.data.number.toString()}
            />
          )} */}
    </aside>
  );
};

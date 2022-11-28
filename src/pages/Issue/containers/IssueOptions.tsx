import { FC } from 'react';
import { Label } from 'enities/Label.entity';
import { User } from 'enities/User.entity';
import { useIssue } from 'hooks/UseIssue/useIssue';
import { useIssueUpdate } from 'hooks/UseIssueUpdate/useIssueUpdate';
import { StatusList } from 'pages/Issues/container/StatusList';

import { IssueAssignment } from './IssueAssignment';
import { IssueLabels } from './IssueLabels';

type TProps = {
  issue?: string;
};

export const IssueOptions: FC<TProps> = ({ issue }) => {
  const { data, isLoading } = useIssue(Number(issue));
  const issueMutate = useIssueUpdate();

  const handleSetStaus = (status: React.ChangeEvent<HTMLSelectElement>) => {
    issueMutate.mutate({
      id: Number(data?.number),
      params: { status: status.target.value }
    });
  };
  const handleSetAssignee = (assignee: User['id']) => {
    issueMutate.mutate({ id: Number(data?.number), params: { assignee } });
  };
  const handleSetLabels = (labels: Array<Label['id']>) => {
    issueMutate.mutate({ id: Number(data?.number), params: { labels } });
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

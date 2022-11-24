import { FC, useMemo } from 'react';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Issue } from 'enities/Issue.entity';
import { ISSUE_STATUS } from 'enums/enums';
import { relativeDate } from 'utils/relativeDate';

export const IssueHeader: FC<Issue> = (props) => {
  const { title, number, status, createdBy, createdDate, comments } = props;

  const isClosed = useMemo(() => {
    return Boolean(['done', 'cancelled'].includes(status));
  }, [status]);

  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span className={isClosed ? 'closed' : 'open'}>
          {isClosed ? <GoIssueOpened /> : <GoIssueClosed />}
          {ISSUE_STATUS[status]}
        </span>
        <span className='created-by'>
          {createdBy?.name} opened this issue {relativeDate(createdDate)} ·{' '}
          {comments.length} comments
        </span>
      </div>
    </header>
  );
};

import { FC } from 'react';
import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { QueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { paths } from 'config/paths';
import { Comment } from 'enities/Comment.entity';
import { Issue } from 'enities/Issue.entity';
import { issueKeys } from 'enums/queries';
import { fetchIssueComments } from 'services/API';
import { relativeDate } from 'utils/relativeDate';

const client = new QueryClient();

type Props = {} & Issue;

export const IssueListItem: FC<Props> = (props) => {
  const {
    title,
    number,
    status,
    labels,
    createdDate,
    createdBy,
    assignee,
    commentCount
  } = props;

  const prefetchComments = () => {
    client.prefetchInfiniteQuery(issueKeys.comments(number), async () => {
      const data = await fetchIssueComments({ number, page: 1 });
      const comments = Comment.deserializeAsArray(data);

      return comments;
    });
  };

  return (
    <li onMouseEnter={prefetchComments}>
      <div>
        {status === ('done' || 'cancelled') ? (
          <GoIssueOpened style={{ color: 'red' }} />
        ) : (
          <GoIssueClosed style={{ color: 'green' }} />
        )}
      </div>
      <div className='issue-content'>
        <span>
          <Link to={paths.issue(number)}>{title}</Link>
          {labels.map((label) => (
            <span key={label.id} className={`label ${label.color}`}>
              {label.name}
            </span>
          ))}
        </span>
        <small>
          #{number} oopened {relativeDate(createdDate)} by {createdBy?.name}
        </small>
      </div>
      {assignee && (
        <img
          src={assignee.profilePictureUrl}
          alt={`Avatar by ${assignee.name}`}
          className='assigned-to'
        />
      )}
      <span className='comment-count'>
        <GoComment />
        {commentCount}
      </span>
    </li>
  );
};

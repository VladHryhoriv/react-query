import { FC } from 'react';
import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { paths } from 'config/paths';
import { Comment } from 'enities/Comment.entity';
import { Issue } from 'enities/Issue.entity';
import { User } from 'enities/User.entity';
import { issueKeys, userKeys } from 'enums/queries';
import { fetchIssueComments } from 'services/API';
import { queryClient } from 'utils/queryClient';
import { relativeDate } from 'utils/relativeDate';

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
    queryClient.prefetchInfiniteQuery(
      issueKeys.comments(number, 1),
      async () => {
        const commentsData = await fetchIssueComments({ number, page: 1 });
        const users = queryClient.getQueryData<
          ReturnType<typeof User.deserializeAsMap>
        >(userKeys.root);

        const comments = Comment.deserializeAsArray(
          commentsData.map((comment) => ({
            ...comment,
            createdBy: users?.get(comment.createdBy) as User
          }))
        );

        return comments;
      }
    );
  };

  return (
    <li onMouseEnter={prefetchComments}>
      <div>
        {status === ('done' || 'cancelled') ? (
          <GoIssueOpened
            style={{ color: 'red' }}
            role='img'
            aria-label='Status done'
          />
        ) : (
          <GoIssueClosed
            style={{ color: 'green' }}
            role='img'
            aria-label='Status open'
          />
        )}
      </div>
      <div className='issue-content'>
        <span key={number}>
          <Link to={paths.issue(number)} role='link'>
            {title}
          </Link>
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
      <span aria-label='Comment count' className='comment-count'>
        <GoComment />
        {commentCount}
      </span>
    </li>
  );
};

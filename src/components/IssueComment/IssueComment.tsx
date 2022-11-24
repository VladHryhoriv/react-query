import { FC } from 'react';
import { Comment } from 'enities/Comment.entity';
import { relativeDate } from 'utils/relativeDate';

export const IssueComment: FC<Comment> = (props) => {
  const { createdBy, comment, createdDate } = props;

  return (
    <div className='comment'>
      <img src={createdBy?.profilePictureUrl} alt='Avatar' />
      <div>
        <div className='comment-header'>
          <span>{createdBy?.name}</span> commented{' '}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className='comment-body'>{comment}</div>
      </div>
    </div>
  );
};

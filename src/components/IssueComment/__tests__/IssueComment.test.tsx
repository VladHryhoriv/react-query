import { render, screen } from '@testing-library/react';
import { Comment } from 'enities/Comment.entity';
import { User } from 'enities/User.entity';
import { relativeDate } from 'utils/relativeDate';

import { IssueComment } from '../IssueComment';

const user: User = {
  id: '1',
  name: 'Rob',
  profilePictureUrl:
    'https://res.cloudinary.com/uidotdev/image/twitter_name/tylermcginnis'
};

const comment: Comment = {
  id: '1',
  createdBy: user,
  createdDate: new Date(),
  comment: 'test'
};

describe('IssueComment', () => {
  it('it render user image', () => {
    render(<IssueComment {...comment} />);

    const userImage = screen.getByRole('img');

    expect(userImage).toHaveAttribute('src', user.profilePictureUrl);
  });

  it('it render correct comment date', () => {
    render(<IssueComment {...comment} />);

    const commentDate = screen.getByText(relativeDate(comment.createdDate));

    expect(commentDate).toBeInTheDocument();
  });

  it('it render correct comment', () => {
    render(<IssueComment {...comment} />);

    const commentText = screen.getByText(comment.comment);

    expect(commentText).toBeInTheDocument();
  });
});

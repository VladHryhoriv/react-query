import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Issue } from 'enities/Issue.entity';
import { relativeDate } from 'utils/relativeDate';

import { IssueListItem } from '../IssueListItem';

const user = {
  id: '1',
  name: 'Rob',
  profilePictureUrl:
    'https://res.cloudinary.com/uidotdev/image/twitter_name/tylermcginnis'
};

const issue: Issue = {
  labels: [{ id: '1', name: 'Bug', color: 'red' }],
  assignee: user,
  createdBy: user,
  id: '1',
  title: 'React bug with Redux',
  number: 998,
  commentCount: 3,
  createdDate: new Date(),
  completedDate: new Date(),
  dueDate: new Date(),
  status: 'done',
  comments: ['c_406', 'c_102']
};

const MockIssueListItem: FC<Issue> = (props) => (
  <BrowserRouter>
    <IssueListItem {...props} />
  </BrowserRouter>
);

describe('IssueListItem', () => {
  it('it renders without error', () => {
    expect(<IssueListItem {...issue} />).toBeTruthy();
  });

  it('it render correct title', () => {
    render(<MockIssueListItem {...issue} />);
    const link = screen.getByRole('link');
    expect(link.textContent).toBe(issue.title);
  });

  it('it render correct status icon', () => {
    render(<MockIssueListItem {...issue} />);
    const status = screen.getByRole('img', {
      name: /status done/i
    });
    expect(status).toBeInTheDocument();
  });

  it('it render correct sub title', () => {
    render(<MockIssueListItem {...issue} />);

    const subtitle = screen.getByText(
      `#${issue.number} oopened ${relativeDate(issue.createdDate)} by ${
        issue.createdBy?.name
      }`
    );

    expect(subtitle).toBeInTheDocument();
  });

  it('it render user image', () => {
    render(<MockIssueListItem {...issue} />);

    const userImg = screen.getByAltText(`Avatar by ${issue.assignee?.name}`);

    expect(userImg).toBeInTheDocument();
  });

  it('render correct comments count', () => {
    render(<MockIssueListItem {...issue} />);

    const commentElement = screen.getByText(issue.commentCount.toString());

    expect(commentElement).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { Issue } from 'enities/Issue.entity';
import { User } from 'enities/User.entity';
import { ISSUE_STATUS } from 'enums/enums';

import { IssueHeader } from '../IssueHeader';

const user: User = {
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

describe('IssueHeader', () => {
  it('it render correct issue tittle', () => {
    render(<IssueHeader {...issue} />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe(`${issue.title} #${issue.number}`);
  });

  it('it render correct label', () => {
    render(<IssueHeader {...issue} />);

    const labelElement = screen.getByText(ISSUE_STATUS[issue.status]);

    expect(labelElement).toBeInTheDocument();
  });
});

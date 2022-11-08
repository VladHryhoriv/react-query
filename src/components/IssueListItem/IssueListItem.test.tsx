import { Issue } from 'enities/Issue.entity';

import { IssueListItem } from './IssueListItem';

const props: Issue = {
  id: 'unic_id_123s',
  title: 'React + Reqct Query + Typescript',
  number: 1,
  assignee: 'user_1',
  commentCount: 31,
  createdBy: 'user_2',
  createdDate: new Date(),
  labels: ['Bug'],
  comments: ['Bug'],
  dueDate: new Date(),
  completedDate: new Date(),
  status: 'done'
};

describe('IssueListItem', () => {
  it('it renders without error', () => {
    expect(<IssueListItem {...props} />).toBeTruthy();
  });
});

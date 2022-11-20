import { Issue } from 'enities/Issue.entity';

import { IssueListItem } from '../IssueListItem';

const issue: Issue = require('../../../mocks/data/issue.json');

describe('IssueListItem', () => {
  it('it renders without error', () => {
    expect(<IssueListItem {...issue} />).toBeTruthy();
  });
});

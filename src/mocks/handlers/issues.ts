import { rest } from 'msw';
import { IssueDTO } from 'types/Issues';

const issues: IssueDTO[] = require('../data/issues.json');

export const issuesHandlers = [
  rest.get('*/issues', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(issues));
  })
];

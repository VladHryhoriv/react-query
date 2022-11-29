import loadable from '@loadable/component';

import { Loader } from '../components/Loader';

export const IssuesPage = loadable(
  () => import(/* webpackChunkName: "issues-page" */ '../pages/Issues'),
  {
    resolveComponent: ({ IssuesPage }) => IssuesPage,
    fallback: <Loader />
  }
);

export const IssuePage = loadable(
  () => import(/* webpackChunkName: "issue-page" */ '../pages/Issue'),
  {
    resolveComponent: ({ IssuePage }) => IssuePage,
    fallback: <Loader />
  }
);

export const AddIssuePage = loadable(
  () => import(/* webpackChunkName: "add-issue-page" */ '../pages/AddIssue'),
  {
    resolveComponent: ({ AddIssue }) => AddIssue,
    fallback: <Loader />
  }
);

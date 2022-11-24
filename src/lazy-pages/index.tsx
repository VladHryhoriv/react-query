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
  () => import(/* webpackChunkName: "issues-page" */ '../pages/Issue'),
  {
    resolveComponent: ({ IssuePage }) => IssuePage,
    fallback: <Loader />
  }
);

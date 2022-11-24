import { Issue } from 'enities/Issue.entity';

import { QUERY_ENTITIES, QUERY_SCOPES } from './enums';

export const issueKeys = {
  root: [{ scope: QUERY_SCOPES.issues }] as const,
  issue: (number: Issue['number']) =>
    [{ ...issueKeys.root[0], number, entity: QUERY_ENTITIES.issue }] as const,
  comments: (number: Issue['number'], page: number) =>
    [
      { ...issueKeys.root[0], number, page, entity: QUERY_ENTITIES.comments }
    ] as const
};

export const labelsKeys = {
  root: [{ scope: QUERY_SCOPES.labels }] as const
};

export const userKeys = {
  root: [{ scope: QUERY_SCOPES.users }] as const,
  user: (id: string) =>
    [{ ...userKeys.root[0], id, entity: QUERY_ENTITIES.user }] as const
};

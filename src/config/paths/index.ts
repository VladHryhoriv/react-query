export const paths = {
  home: (): string => `${paths.issues()}`,
  issues: (): string => 'issues',
  issue: (id: number | string = ':id') => `issue/${id}`
};

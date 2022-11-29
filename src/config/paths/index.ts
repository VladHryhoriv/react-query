export const paths = {
  issues: (): string => '/',
  issue: (id: number | string = ':id') => `/issue/${id}`,
  addIssue: () => `/add`
};

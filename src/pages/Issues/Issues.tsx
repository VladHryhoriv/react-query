import { FC } from 'react';
import { Button } from 'components/Button';
import { IssueListItem } from 'components/IssueListItem';
import { useIssues } from 'hooks/Issues/useIssues';

export const IssuesPage: FC = () => {
  const { data, isLoading, isError, error } = useIssues();

  console.log('data --->', data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className='issues'>
      {data?.map((issue) => (
        <IssueListItem {...issue} />
      ))}
      <Button>TEST</Button>
    </div>
  );
};

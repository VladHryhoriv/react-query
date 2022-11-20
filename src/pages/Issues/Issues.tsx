import { FC } from 'react';
import { IssueListItem } from 'components/IssueListItem';
import { useIssues } from 'hooks/Issues/useIssues';

export const IssuesPage: FC = () => {
  const { data, isLoading, isError, error } = useIssues();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  console.log('data ---->', data);

  return (
    <div className='issues'>
      <main>
        <section>
          <h1>Issues</h1>
          <div>
            <ul className='issues-list'>
              {data?.map((issue) => (
                <IssueListItem key={issue.id} {...issue} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

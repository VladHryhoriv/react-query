import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { IssueListItem } from 'components/IssueListItem';
import { SingleForm } from 'components/SingleForm';
import { useIssues } from 'hooks/Issues/useIssues';

export const IssuesPage: FC = () => {
  const [search, setSearch] = useState<string>('');

  const { data, isLoading, isError, error } = useIssues(search);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    setSearch(e.target.search.value);
  };

  const renderList = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      toast.error(error.message);
      throw new Error(error.message);
    }

    return (
      <div>
        <ul className='issues-list'>
          {data?.map((issue) => (
            <IssueListItem key={issue.id} {...issue} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className='issues'>
      <main>
        <section>
          <h1>Issues</h1>
          <SingleForm
            onSubmit={handleSubmit}
            name='search'
            label='Search'
            placeholder='Search'
          />
          {renderList()}
        </section>
      </main>
    </div>
  );
};

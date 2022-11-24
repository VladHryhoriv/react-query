import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { IssueListItem } from 'components/IssueListItem';
import { SingleForm } from 'components/SingleForm';
import { Label } from 'enities/Label.entity';
import { useIssues } from 'hooks/Issues/useIssues';
import { IssuesRequestParams } from 'types/Issues';

import { LabelList } from './container/LabelList';

export const IssuesPage: FC = () => {
  const [params, setParams] = useState<IssuesRequestParams>({
    search: '',
    labels: [],
    status: ''
  });

  const { data, isLoading, isError, error } = useIssues(params);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParams({
      ...params,
      // @ts-ignore
      search: e.target.search.value
    });
  };

  const handleLabelSelect = (id: Label['id']) => {
    setParams({
      ...params,
      labels: params.labels.includes(id)
        ? params.labels.filter((lId) => lId !== id)
        : [...params.labels, id]
    });
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
    <div>
      <main>
        <section>
          <h2>Issues</h2>
          <SingleForm
            onSubmit={handleSubmit}
            name='search'
            label='Search'
            placeholder='Search'
          />
          {renderList()}
        </section>
        <aside>
          <LabelList onClick={handleLabelSelect} selected={params.labels} />
          {/* <h3>Status</h3>
        <StatusSelect value={status} onChange={handleSetStatus} />
        <hr />
        <Link className='button' to='/add'>
          Add issue
        </Link> */}
        </aside>
      </main>
    </div>
  );
};

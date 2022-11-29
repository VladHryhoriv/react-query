import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IssueListItem } from 'components/IssueListItem';
import { SingleForm } from 'components/SingleForm';
import { paths } from 'config/paths';
import { Label } from 'enities/Label.entity';
import { useIssues } from 'hooks/UseIssues/useIssues';
import { IssuesRequestParams } from 'types/Issues';

import { LabelList } from './container/LabelList';
import { StatusList } from './container/StatusList';

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

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({
      ...params,
      status: e.target.value
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
          <StatusList onClick={handleStatusSelect} selected={params.status} />
          <hr />
          <Link className='button' to={paths.addIssue()}>
            Add issue
          </Link>
        </aside>
      </main>
    </div>
  );
};

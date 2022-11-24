import { FC } from 'react';
import { Link, Navigate, Route, Routes, useMatch } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { paths } from 'config/paths';
import { useLabels } from 'hooks/Label/useLabels';
import { useUsers } from 'hooks/User/useUsers';
import { IssuePage, IssuesPage } from 'lazy-pages';

export const App: FC = () => {
  const isRootPage = useMatch(paths.issues());

  const users = useUsers();
  const labels = useLabels();

  if (users.isLoading || labels.isLoading) {
    return <Loader />;
  }

  if (users.isError || labels.isError) {
    throw new Error(users.error?.message || labels.error?.message);
  }

  return (
    <div className='container'>
      <div className='App'>
        {!isRootPage && <Link to={paths.issues()}>Back to Issues List</Link>}

        <Routes>
          <Route path={paths.issues()} element={<IssuesPage />} />
          <Route path={paths.issue()} element={<IssuePage />} />
          <Route path='*' element={<Navigate to={paths.issues()} />} />
        </Routes>
      </div>
    </div>
  );
};

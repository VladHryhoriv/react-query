import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { paths } from 'config/paths';
import { IssuesPage } from 'lazy-pages';

export const App: FC = () => {
  return (
    <div className='container'>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to={paths.issues()} />} />
            <Route path={paths.issues()} element={<IssuesPage />} />
            <Route path='*' element={<Navigate to={paths.home()} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

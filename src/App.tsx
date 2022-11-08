import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { paths } from 'config/paths';
import { IssuesPage } from 'lazy-pages';

// Start the mocking conditionally.
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser');
//   worker.start();
// }

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={paths.issues()} />} />
        <Route path={paths.issues()} element={<IssuesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

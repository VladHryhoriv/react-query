import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { worker } from '@uidotdev/react-query-api';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { queryClient } from 'utils/queryClient';

import { App } from './App';
import { reportWebVitals } from './reportWebVitals';

// Styles
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: 'bypass'
    })
  )
  .then(() => {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
              <ToastContainer />
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
            </QueryClientProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { init, Router } from '@cteamdev/router';
import './bridge';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RetryValue } from 'react-query/types/core/retryer';
import axios from 'axios';

init();

//* Повторяю неуспешные запросы 3 раза, если есть необработанные ошибки*/
const retryCondition: RetryValue<unknown> = (errorCount, error) => {
  if (errorCount >= 3) return false;
  if (axios.isAxiosError(error)) {
    if (
      error.response?.status &&
      error.response?.status >= 500 &&
      error.response?.status < 600
    )
      return true;
  }
  return false;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: retryCondition,
    },
    queries: {
      retry: retryCondition,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') import('./eruda');

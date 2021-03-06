import { init, Router } from '@cteamdev/router';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { RetryValue } from 'react-query/types/core/retryer';
import { App } from './App';
import './bridge';

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
      cacheTime: 1000 * 60 * 60 * 24, // 24 часа
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
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

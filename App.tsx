import React from 'react';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {store} from './src/redux/store';
import AppWrapper from './src/components/AppWrapper';

import './global.css';

// Initialize Reactotron in development
if (__DEV__) {
  require('./src/config/ReactotronConfig');
}

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

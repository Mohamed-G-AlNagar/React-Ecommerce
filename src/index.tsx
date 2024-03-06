import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import TokenContextProvider from './context/TokenContext';

//? 1- React-Query step 1 (create the query client(setup the cash will store the data))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // ? the time that the data will stay in the cash till refetch it again
    },
  },
});

const toasterOptions = {
  success: {
    duration: 3000,
  },
  error: {
    duration: 5000,
  },
  style: {
    fontSize: '16px',
    maxWidth: '500px',
    padding: '16px 24px',
    backgroundColor: 'yellow',
    color: 'black',
  },
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//? 2- step 2 Providing the data to the all components tree as done with
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <TokenContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={toasterOptions}
          />
        </QueryClientProvider>
      </TokenContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

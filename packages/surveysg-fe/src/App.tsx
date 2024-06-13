import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import router from '~/router';

import { AuthenticationContextProvider } from './contexts/AuthenticationContext';
import AntDesignProvider from './providers/AntDesignProvider';

const queryClient = new QueryClient();

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s - SurveySG" />
      <QueryClientProvider client={queryClient}>
        <AntDesignProvider>
          <AuthenticationContextProvider>
            <RouterProvider router={router} />
          </AuthenticationContextProvider>
        </AntDesignProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

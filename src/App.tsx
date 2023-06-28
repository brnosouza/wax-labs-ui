import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { queryClient } from '@/api/queryClient';
import { ChainProvider } from '@/providers/chain.tsx';
import { route } from '@/route';

export function App() {
  return (
    <ChainProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ChainProvider>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  );
}

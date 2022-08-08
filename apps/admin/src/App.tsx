import { trpc } from './utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Layout } from './components/layout';
import superjson from 'superjson';

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3333/trpc',
      transformer: superjson,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;

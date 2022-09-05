import { trpc } from './utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import superjson from 'superjson';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navbar } from 'components/layout/Navbar';
import { Main } from 'components/layout/Main';
import { Header } from 'components/layout/Header';

export const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 0,
          },
        },
      })
  );
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
            <Grid
              maxW="full"
              h="100vh"
              templateAreas={`"nav header"
                      "nav main"`}
              gridTemplateRows={'1fr 9fr'}
              gridTemplateColumns={'1fr 5fr'}
              overflowY={'hidden'}
            >
              <Navbar />
              <Header />
              <Main />
            </Grid>
          </BrowserRouter>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;

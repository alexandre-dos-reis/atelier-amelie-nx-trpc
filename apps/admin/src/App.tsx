import { trpc } from './utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Grid } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Main, Navbar } from './components/layout';

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3333/trpc',
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
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;

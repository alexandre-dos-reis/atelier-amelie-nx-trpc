import { trpc } from './utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './pages/Home';
import { Artwork } from './pages/Artwork';

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
        <Artwork id={2} />
        <Home />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;

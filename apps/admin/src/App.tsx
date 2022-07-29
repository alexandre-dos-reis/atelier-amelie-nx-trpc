import { trpc } from './utils/trpc';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Artworks } from './pages/Artworks';
import { Artwork } from './pages/Artwork';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { routes } from './utils/routes';
import { Home } from './pages/Home';

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
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={routes['home'].url} element={<Home />} />
            <Route path={routes['artworks'].url} element={<Outlet />}>
              <Route index element={<Artworks />} />
              <Route path={`:${routes['artworks'].params?.['id']}`} element={<Artwork />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;

import { GridItem, useColorModeValue } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Artwork } from '../../pages/Artwork';
import { Artworks } from '../../pages/Artworks';
import { Home } from '../../pages/Home';
import { routes } from '../../utils/routes';

export const Main = () => (
  <GridItem
    area={'main'}
    overflowY={'scroll'}
    overflowX={'hidden'}
    bg={useColorModeValue('gray.100', 'gray.900')}
    p={'2'}
  >
    <Routes>
      <Route path={routes['home'].url} element={<Home />} />
      <Route path={routes['artworks'].url} element={<Outlet />}>
        <Route index element={<Artworks />} />
        <Route path={`:${routes['artworks'].params?.['id']}`} element={<Artwork />} />
      </Route>
    </Routes>
  </GridItem>
);

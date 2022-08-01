import { GridItem, useColorModeValue } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ArtworkEdit, Artworks, Home } from '../../pages';
import { routes } from '../../utils/routes';

export const Main = () => (
  <GridItem
    area={'main'}
    overflowY={'scroll'}
    overflowX={'hidden'}
    bg={useColorModeValue('gray.100', 'gray.900')}
  >
    <Routes>
      <Route path={routes['home'].url} element={<Home />} />
      <Route path={routes['artworks'].url} element={<Outlet />}>
        <Route index element={<Artworks />} />
        <Route path={`:${routes['artworks'].params?.['id']}`} element={<ArtworkEdit />} />
      </Route>
    </Routes>
  </GridItem>
);

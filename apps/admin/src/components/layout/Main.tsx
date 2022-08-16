import { GridItem, useColorModeValue } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
  ArtworkEdit,
  ArtworksList,
  ArtworkCreate,
  Home,
  CategoriesList,
  CategoryEdit,
  CategoryCreate,
} from '../../pages';
import { routes } from '../../utils/routes';

export const Main = () => (
  <GridItem
    area={'main'}
    overflowY={'scroll'}
    overflowX={'hidden'}
    bg={useColorModeValue('gray.100', 'gray.900')}
    paddingBottom="20"
  >
    <Routes>
      <Route path={routes['home'].url} element={<Home />} />
      <Route path={routes['artworks'].url} element={<Outlet />}>
        <Route index element={<ArtworksList />} />
        <Route path={routes['artworks'].children?.['id'].url} element={<ArtworkEdit />} />
        <Route path={routes['artworks'].children?.['create'].url} element={<ArtworkCreate />} />
      </Route>
      <Route path={routes['categories'].url} element={<Outlet />}>
        <Route index element={<CategoriesList />} />
        <Route path={routes['categories'].children?.['id'].url} element={<CategoryEdit />} />
        <Route path={routes['categories'].children?.['create'].url} element={<CategoryCreate />} />
      </Route>
    </Routes>
  </GridItem>
);

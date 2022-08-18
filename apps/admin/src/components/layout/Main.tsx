import { GridItem, useColorModeValue } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
  Home,
  ArtworkEdit,
  ArtworksList,
  ArtworkCreate,
  CategoriesList,
  CategoryEdit,
  CategoryCreate,
  ProductsList,
  ProductCreate,
  ProductsImagesList,
  ShopCatsList,
  ShopSubCatsList,
} from '../../pages';
import { routes } from '../../utils/routes';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const Main = () => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <GridItem
      area={'main'}
      overflowY={'scroll'}
      overflowX={'hidden'}
      bg={useColorModeValue('gray.100', 'gray.900')}
      paddingBottom="20"
      ref={animationParent}
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
          <Route
            path={routes['categories'].children?.['create'].url}
            element={<CategoryCreate />}
          />
        </Route>
        <Route path={routes['shop'].url}>
          <Route path={routes['shop'].children?.['products'].url} element={<Outlet />}>
            <Route index element={<ProductsList />} />
            <Route
              path={routes['shop'].children?.['products'].children?.['id'].url}
              element={<ProductsImagesList />}
            />
            <Route
              path={routes['shop'].children?.['products'].children?.['create'].url}
              element={<ProductCreate />}
            />
          </Route>
          <Route path={routes['shop'].children?.['subCategories'].url} element={<Outlet />}>
            <Route index element={<ShopSubCatsList />} />
          </Route>
          <Route path={routes['shop'].children?.['categories'].url} element={<Outlet />}>
            <Route index element={<ShopCatsList />} />
          </Route>
        </Route>
      </Routes>
    </GridItem>
  );
};

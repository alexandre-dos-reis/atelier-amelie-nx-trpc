import { CustomRouteObject } from './custom-route-object.interface';
import {
  ProductCreate,
  ProductEdit,
  ProductsImagesList,
  ProductsList,
  ShopCatsList,
  ShopSubCatsList,
} from '../pages';

export const ShopRoutes: CustomRouteObject = {
  path: 'shop',
  name: 'shop',
  children: [
    {
      path: 'products',
      name: 'products',
      children: [
        {
          index: true,
          element: <ProductsList />,
        },
        {
          path: ':id',
          name: 'edit',
          element: <ProductEdit />,
        },
        {
          path: 'create',
          name: 'create',
          element: <ProductCreate />,
        },
        {
          path: 'images',
          name: 'images',
          children: [
            {
              index: true,
              element: <ProductsImagesList />,
            },
          ],
        },
      ],
    },
    {
      path: 'sub-categories',
      name: 'sub-categories',
      children: [
        {
          index: true,
          element: <ShopSubCatsList />,
        },
      ],
    },
    {
      path: 'categories',
      name: 'categories',
      children: [
        {
          index: true,
          element: <ShopCatsList />,
        },
      ],
    },
  ],
};

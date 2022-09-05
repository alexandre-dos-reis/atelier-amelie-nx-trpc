import { CustomRouteObject } from 'utils';
import { ShopCatsList } from './pages';

export const categoriesRoutes: CustomRouteObject = {
    path: 'categories',
    name: 'categories',
    children: [
      {
        index: true,
        element: <ShopCatsList />,
      },
    ],
  }

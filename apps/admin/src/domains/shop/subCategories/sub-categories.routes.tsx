import { CustomRouteObject } from 'utils';
import { ShopSubCatsList } from './pages';

export const subCategoriesRoutes: CustomRouteObject = {
    path: 'sous-categories',
    name: 'sub-categories',
    children: [
      {
        index: true,
        element: <ShopSubCatsList />,
      },
    ],
  }
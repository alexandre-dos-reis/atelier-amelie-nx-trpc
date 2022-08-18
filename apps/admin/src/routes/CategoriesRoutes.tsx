import { CustomRouteObject } from './custom-route-object.interface';
import { CategoriesList, CategoryCreate, CategoryEdit } from '../pages';

export const CategoriesRoutes: CustomRouteObject = {
  path: 'categories',
  name: 'categories',
  children: [
    {
      index: true,
      element: <CategoriesList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <CategoryEdit />,
    },
    {
      path: 'create',
      name: 'create',
      element: <CategoryCreate />,
    },
  ],
};

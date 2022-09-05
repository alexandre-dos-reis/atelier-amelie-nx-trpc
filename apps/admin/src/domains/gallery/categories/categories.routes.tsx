import { CustomRouteObject } from 'utils';
import { CategoriesList, CategoryCreate, CategoryEdit } from './pages';

export const CategoriesRoutes: CustomRouteObject = {
  path: 'categories',
  name: 'categories',
  children: [
    {
      index: true,
      name: 'list',
      element: <CategoriesList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <CategoryEdit />,
    },
    {
      path: 'creation',
      name: 'create',
      element: <CategoryCreate />,
    },
  ],
};

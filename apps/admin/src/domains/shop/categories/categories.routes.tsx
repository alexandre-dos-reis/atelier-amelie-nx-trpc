import { CustomRouteObject } from 'utils';
import { ChildrenCategoriesList, ParentCategoriesList } from './pages';

export const parentCategoriesRoutes: CustomRouteObject = {
  path: 'categories',
  name: 'categories',
  children: [
    {
      index: true,
      element: <ParentCategoriesList />,
    },
  ],
};

export const childrenCategoriesRoutes: CustomRouteObject = {
  path: 'sous-categories',
  name: 'sub-categories',
  children: [
    {
      index: true,
      element: <ChildrenCategoriesList />,
    },
  ],
};

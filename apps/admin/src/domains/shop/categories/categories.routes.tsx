import { CustomRouteObject } from 'utils';
import { ChildrenCategoriesList, ParentCategoriesList } from './pages';

export const shopCategoriesRoutes: CustomRouteObject = {
  path: 'categories',
  name: 'categories',
  children: [
    {
      name: 'parent-list',
      path: 'parents',
      element: <ParentCategoriesList />,
    },
    {
      name: 'children-list',
      path: 'enfants',
      element: <ChildrenCategoriesList />,
    },
  ],
};

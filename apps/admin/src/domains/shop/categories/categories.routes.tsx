import { CustomRouteObject } from 'utils';
import {
  ChildrenCategoriesList,
  ParentCategoriesList,
  ShopCategoryCreate,
  ShopCategoryEdit,
} from './pages';

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
    {
      path: ':id',
      name: 'edit',
      element: <ShopCategoryEdit />,
    },
    {
      path: 'creation',
      name: 'create',
      element: <ShopCategoryCreate />,
    },
  ],
};

import { CustomRouteObject } from 'utils';
import { shopCategoriesRoutes } from './categories/categories.routes';
import { productsRoutes } from './products/products.routes';

export const shopRoutes: CustomRouteObject = {
  path: 'boutique',
  name: 'shop',
  children: [productsRoutes, shopCategoriesRoutes],
};

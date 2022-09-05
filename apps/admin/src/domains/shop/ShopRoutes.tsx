import { CustomRouteObject } from 'utils';
import { categoriesRoutes } from './categories/categories.routes';
import { productsRoutes } from './products/products.routes';

export const ShopRoutes: CustomRouteObject = {
  path: 'boutique',
  name: 'shop',
  children: [productsRoutes, categoriesRoutes],
};

import { CustomRouteObject } from 'utils';
import { categoriesRoutes } from './categories/categories.routes';
import { productsRoutes } from './products/products.routes';
import { subCategoriesRoutes } from './subCategories/sub-categories.routes';

export const ShopRoutes: CustomRouteObject = {
  path: 'boutique',
  name: 'shop',
  children: [
    productsRoutes,
    categoriesRoutes,
    subCategoriesRoutes
  ],
};

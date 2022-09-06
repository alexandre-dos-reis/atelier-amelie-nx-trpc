import { useRoutes } from 'react-router-dom';
import { CustomRouteObject } from 'utils';
import { homeRoutes } from './home/HomeRoutes';
import { shopRoutes } from './shop/shop.routes';
import { categoriesRoutes } from './gallery/categories/categories.routes';
import { purchasesRoutes } from './purchases/purchases.routes';
import { settingsRoutes } from './settings/settings.routes';
import { galleryRoutes } from './gallery/gallery.routes';

export const allRoutes: CustomRouteObject[] = [
  homeRoutes,
  galleryRoutes,
  categoriesRoutes,
  shopRoutes,
  purchasesRoutes,
  settingsRoutes,
  {
    path: '*',
    element: <div>NOT FOUND !</div>
  }
];

export const RootRouterComponent = () => useRoutes(allRoutes);

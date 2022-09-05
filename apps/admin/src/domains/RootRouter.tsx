import { useRoutes } from 'react-router-dom';
import { CustomRouteObject } from 'utils';
import { HomeRoutes } from './home/HomeRoutes';
import { ShopRoutes } from './shop/ShopRoutes';
import { CategoriesRoutes } from './gallery/categories/categories.routes';
import { PurchasesRoutes } from './purchases/PurchasesRoutes';
import { SettingsRoutes } from './settings/SettingsRoutes';
import { galleryRoutes } from './gallery/gallery.routes';

export const allRoutes: CustomRouteObject[] = [
  HomeRoutes,
  galleryRoutes,
  CategoriesRoutes,
  ShopRoutes,
  PurchasesRoutes,
  SettingsRoutes,
];

export const RouterComponent = () => useRoutes(allRoutes);

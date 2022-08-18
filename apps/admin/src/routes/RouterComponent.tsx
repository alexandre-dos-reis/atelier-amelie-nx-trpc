import { useRoutes } from 'react-router-dom';
import { ArtworksRoutes } from './ArtworksRoutes';
import { CategoriesRoutes } from './CategoriesRoutes';
import { HomeRoutes } from './HomeRoutes';
import { CustomRouteObject } from './custom-route-object.interface';
import { ShopRoutes } from './ShopRoutes';
import { PurchasesRoutes } from './PurchasesRoutes';
import { SettingsRoutes } from './SettingsRoutes';

export const Routes: CustomRouteObject[] = [
  HomeRoutes,
  ArtworksRoutes,
  CategoriesRoutes,
  ShopRoutes,
  PurchasesRoutes,
  SettingsRoutes,
];

export const RouterComponent = () => useRoutes(Routes);

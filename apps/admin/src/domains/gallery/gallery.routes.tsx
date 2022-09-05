import { CustomRouteObject } from 'utils';
import { artworksRoutes } from './artworks/artworks.routes';
import { CategoriesRoutes } from './categories/categories.routes';

export const galleryRoutes: CustomRouteObject = {
  path: 'galerie',
  name: 'gallery',
  children: [artworksRoutes, CategoriesRoutes],
};

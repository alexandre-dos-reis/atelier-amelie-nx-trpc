import { CustomRouteObject } from './custom-route-object.interface';
import { ArtworkCreate, ArtworkEdit, ArtworksList } from '../pages';

export const ArtworksRoutes: CustomRouteObject = {
  path: 'artworks',
  name: 'artworks',
  children: [
    {
      index: true,
      element: <ArtworksList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <ArtworkEdit />,
    },
    {
      path: 'create',
      name: 'create',
      element: <ArtworkCreate />,
    },
  ],
};

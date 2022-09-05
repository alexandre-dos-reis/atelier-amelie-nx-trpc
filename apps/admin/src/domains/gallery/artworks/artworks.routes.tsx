import { CustomRouteObject } from 'utils';
import { ArtworkCreate, ArtworkEdit, ArtworksList } from './pages';

export const artworksRoutes: CustomRouteObject = {
  path: 'oeuvres',
  name: 'artworks',
  children: [
    {
      index: true,
      name: 'list',
      element: <ArtworksList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <ArtworkEdit />,
    },
    {
      path: 'creation',
      name: 'create',
      element: <ArtworkCreate />,
    },
  ],
};

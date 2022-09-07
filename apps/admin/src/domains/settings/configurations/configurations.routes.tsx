import { CustomRouteObject } from 'utils';
import { ConfigEdit, ConfigList } from './pages';

export const configurationsRoutes: CustomRouteObject = {
  path: 'config',
  name: 'config',
  children: [
    {
      index: true,
      name: 'list',
      element: <ConfigList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <ConfigEdit />,
    },
  ],
};

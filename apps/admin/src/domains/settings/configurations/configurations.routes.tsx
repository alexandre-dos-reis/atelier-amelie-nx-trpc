import { CustomRouteObject } from 'utils';
import { ConfigurationsList } from './pages';

export const configurationsRoutes: CustomRouteObject = {
      path: 'config',
      name: 'config',
      element: <ConfigurationsList />,
};

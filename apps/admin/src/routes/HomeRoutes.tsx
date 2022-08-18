import { Home } from '../pages';
import { CustomRouteObject } from './custom-route-object.interface';

export const HomeRoutes: CustomRouteObject = {
  path: '',
  name: 'home',
  element: <Home />,
};

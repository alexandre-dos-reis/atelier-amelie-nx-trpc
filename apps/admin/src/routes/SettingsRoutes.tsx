import { ConfigurationsList, ShippingCostsList } from '../pages';
import { CustomRouteObject } from './custom-route-object.interface';

export const SettingsRoutes: CustomRouteObject = {
  path: 'settings',
  name: 'settings',
  children: [
    {
      path: 'shipping-cost',
      name: 'shipping-cost',
      element: <ShippingCostsList />,
    },
    {
      path: 'config',
      name: 'config',
      element: <ConfigurationsList />,
    },
  ],
};

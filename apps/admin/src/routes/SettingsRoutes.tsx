import { ConfigurationsList, ShippingCostsEdit, ShippingCostsList } from '../pages';
import { CustomRouteObject } from './custom-route-object.interface';

export const SettingsRoutes: CustomRouteObject = {
  path: 'settings',
  name: 'settings',
  children: [
    {
      path: 'shipping-cost',
      name: 'shipping-cost',
      children: [
        {
          index: true,
          name: 'list',
          element: <ShippingCostsList />
        },
        {
          path: ':id',
          name: 'edit',
          element: <ShippingCostsEdit/>
        }
      ]
    },
    {
      path: 'config',
      name: 'config',
      element: <ConfigurationsList />,
    },
  ],
};

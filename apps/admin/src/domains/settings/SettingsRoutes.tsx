import { CustomRouteObject } from 'utils';
import { configurationsRoutes } from './configurations/configurations.routes';
import { shippingCostsRoutes } from './shipping-costs/shipping-costs.routes';

export const SettingsRoutes: CustomRouteObject = {
  path: 'settings',
  name: 'settings',
  children: [
    configurationsRoutes,
    shippingCostsRoutes
  ],
};

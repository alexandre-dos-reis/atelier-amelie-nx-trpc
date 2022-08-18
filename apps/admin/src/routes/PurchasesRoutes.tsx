import { PurchasesList } from '../pages';
import { CustomRouteObject } from './custom-route-object.interface';

export const PurchasesRoutes: CustomRouteObject = {
  path: 'purchases',
  name: 'purchases',
  element: <PurchasesList />,
};

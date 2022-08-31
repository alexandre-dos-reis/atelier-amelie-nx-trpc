import { PurchasesList, PurchaseEdit } from '../pages';
import { CustomRouteObject } from './custom-route-object.interface';

export const PurchasesRoutes: CustomRouteObject = {
  path: 'purchases',
  name: 'purchases',
  children: [
    {
      index: true,
      element: <PurchasesList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <PurchaseEdit />,
    },
  ],
};

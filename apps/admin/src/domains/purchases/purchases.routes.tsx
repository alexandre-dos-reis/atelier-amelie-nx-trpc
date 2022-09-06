import { PurchasesList, PurchaseEdit } from './pages';
import { CustomRouteObject } from 'utils';

export const purchasesRoutes: CustomRouteObject = {
  path: 'achats',
  name: 'purchases',
  children: [
    {
      index: true,
      name: 'list',
      element: <PurchasesList />,
    },
    {
      path: ':id',
      name: 'edit',
      element: <PurchaseEdit />,
    },
  ],
};

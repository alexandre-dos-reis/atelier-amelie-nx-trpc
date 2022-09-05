import { CustomRouteObject } from 'utils';
import { ShippingCostsList, ShippingCostsEdit } from './pages';

export const shippingCostsRoutes: CustomRouteObject = {


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
    
};

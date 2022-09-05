import { CustomRouteObject } from "utils";
import { ProductsList, ProductCreate, ProductEdit, ProductsImagesList } from "./pages";

export const productsRoutes: CustomRouteObject = {
    path: 'produits',
    name: 'products',
    children: [
      {
        index: true,
        element: <ProductsList />,
      },
      {
        path: ':id',
        name: 'edit',
        element: <ProductEdit />,
      },
      {
        path: 'create',
        name: 'create',
        element: <ProductCreate />,
      },
      {
        path: 'images',
        name: 'images',
        children: [
          {
            index: true,
            element: <ProductsImagesList />,
          },
        ],
      },
    ],
  }
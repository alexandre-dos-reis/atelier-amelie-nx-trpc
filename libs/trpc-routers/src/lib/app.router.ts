import * as trpc from '@trpc/server';
import {
  AdminVarRouter,
  ArtworkRouter,
  CategoryRouter,
  ImageRouter,
  ProductRouter,
  PurchaseRouter,
  ShippingCostRouter,
  ShopCatRouter,
} from './routers';
import superjson from 'superjson';

export const appRouter = trpc
  .router()
  .transformer(superjson)

  .merge('artwork.', ArtworkRouter)
  .merge('category.', CategoryRouter)
  .merge('product.', ProductRouter)
  .merge('shopCat.', ShopCatRouter)
  .merge('productImage.', ImageRouter)
  .merge('purchase.', PurchaseRouter)
  .merge('shippingCost.', ShippingCostRouter)
  .merge('adminVar.', AdminVarRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

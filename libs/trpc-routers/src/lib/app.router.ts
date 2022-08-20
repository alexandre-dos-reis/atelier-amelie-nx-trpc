import * as trpc from '@trpc/server';
import { ArtworkRouter, CategoryRouter, ProductRouter } from './routers';
import superjson from 'superjson';

export const appRouter = trpc
  .router()
  .transformer(superjson)

  .merge('artwork.', ArtworkRouter)
  .merge('category.', CategoryRouter)
  .merge('product.', ProductRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

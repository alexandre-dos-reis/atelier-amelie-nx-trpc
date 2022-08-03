import * as trpc from '@trpc/server';
import { ArtworkRouter, CategoryRouter } from './routers';

export const appRouter = trpc
  .router()

  .merge('artwork.', ArtworkRouter)
  .merge('category.', CategoryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

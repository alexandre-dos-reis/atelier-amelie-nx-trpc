import * as trpc from '@trpc/server';
import { ArtworkRouter, CategoryRouter } from './routers';
import superjson from 'superjson';

export const appRouter = trpc
  .router()
  .transformer(superjson)

  .merge('artwork.', ArtworkRouter)
  .merge('category.', CategoryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

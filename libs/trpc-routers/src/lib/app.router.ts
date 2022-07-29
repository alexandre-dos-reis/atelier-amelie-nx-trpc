import * as trpc from '@trpc/server';
import { ArtworkRouter } from './sub-routers/artwork.router';
import { CategoryRouter } from './sub-routers/category.router';

export const appRouter = trpc
  .router()

  .merge('artwork.', ArtworkRouter)
  .merge('category.', CategoryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

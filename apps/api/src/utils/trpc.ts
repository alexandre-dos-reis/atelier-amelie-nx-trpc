import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { PrismaClient } from '@prisma/client';

// created for each request
export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const prisma = new PrismaClient();
  return {
    prisma,
  };
};
type Context = trpc.inferAsyncReturnType<typeof createContext>;

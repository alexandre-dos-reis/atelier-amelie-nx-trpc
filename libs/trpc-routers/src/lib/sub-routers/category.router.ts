import * as trpc from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CategoryRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      return {
        artworks: await prisma.artwork.findMany(),
      };
    },
  });

import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../utils/prisma';

export const CategoryRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      return {
        categories: await prisma.category.findMany(),
      };
    },
  });

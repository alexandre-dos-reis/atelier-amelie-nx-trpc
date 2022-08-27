import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const ImageRouter = trpc
  .router()

  .query('getProductImages', {
    async resolve() {
      const images = await prisma.productImage.findMany();
      return {
        images,
      };
    },
  });

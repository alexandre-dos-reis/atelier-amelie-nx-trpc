import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const PurchaseRouter = trpc
  .router()

  .query('findAll', {
    async resolve() {
      const purchases = await prisma.purchase.findMany({
        include: {
          _count: {
            select: {
              purchaseItems: true,
            },
          },
        },
      });
      return {
        purchases,
      };
    },
  })

  .query('getOne', {
    input: z.string(),
    async resolve({ input }) {
      const purchase = await prisma.purchase.findFirstOrThrow({
        where: {
          id: input,
        },
        include: {
          addresses: true,
          purchaseItems: true,
        },
      });
      return {
        purchase,
      };
    },
  });

import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const ShippingCostRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      const shippingCosts = await prisma.shippingCost.findMany({
        orderBy: {
          max: 'asc',
        },
      });
      return {
        shippingCosts,
      };
    },
  });

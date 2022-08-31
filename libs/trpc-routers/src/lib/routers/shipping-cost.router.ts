import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';
import { shippingCost } from '@atelier-amelie-nx-trpc/validation-schema';

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
  })

  .query('getOne', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const shippingCost = await prisma.shippingCost.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      return {
        shippingCost,
      };
    },
  })

  .mutation('updateOne', {
    input: shippingCost.updateOrCreateOneSchema,
    async resolve({ input }) {
      const shippingCost = await prisma.shippingCost.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return {
        shippingCost,
      };
    },
  })

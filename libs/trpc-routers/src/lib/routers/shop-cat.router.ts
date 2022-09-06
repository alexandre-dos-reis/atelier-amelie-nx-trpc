import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const ShopCatRouter = trpc
  .router()

  .query('findAllParentCats', {
    input: z.object({
      selectParent: z.boolean(),
    }),
    async resolve({ input }) {
      const shopCategories = await prisma.shopCategory.findMany({
        where: {
          parentCategoryId: input.selectParent
            ? {
                equals: null,
              }
            : {
                not: null,
              },
        },
      });
      return {
        shopCategories,
      };
    },
  })

  .query('findOne', {
    input: z.object({
      id: z.number().positive(),
    }),
    async resolve({ input }) {
      const category = await prisma.shopCategory.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
      return {
        category,
      };
    },
  });

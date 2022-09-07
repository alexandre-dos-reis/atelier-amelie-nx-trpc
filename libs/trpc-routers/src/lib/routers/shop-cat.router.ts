import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const ShopCatRouter = trpc
  .router()

  .query('findAllParentCategories', {
    async resolve() {
      const shopCategories = await prisma.shopCategory.findMany({
        where: {
          parentCategoryId: {
            equals: null,
          },
        },
      });
      return {
        shopCategories,
      };
    },
  })

  .query('findChildrenCategoriesByParentId', {
    input: z.object({
      parentId: z.number().positive(),
    }),
    async resolve({ input }) {
      const shopCategories = await prisma.shopCategory.findMany({
        where: {
          parentCategoryId: input.parentId,
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

import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

export const ShopCatRouter = trpc
  .router()

  .query('findAllParentCats', {
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

  .query('findAllChildrenCats', {
    async resolve() {
      const shopCategories = await prisma.shopCategory.findMany({
        where: {
          parentCategoryId: {
            not: null,
          },
        },
      });
      return {
        shopCategories,
      };
    },
  });

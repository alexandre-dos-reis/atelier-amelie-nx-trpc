import { productsListSchema } from '@atelier-amelie-nx-trpc/validation-schema';
import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../utils/prisma';

export const ProductRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          updatedAt: true,
          forSale: true,
          stock: true,
          artwork: {
            select: {
              name: true,
              id: true,
            },
          },
          shopCategory: {
            select: {
              id: true,
              name: true,
              parentCategory: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
      return {
        products,
      };
    },
    output: z.object({
      products: productsListSchema,
    }),
  })

  .query('getOne', {
    input: z.number(),
    async resolve({ input }) {
      const product = await prisma.product.findFirstOrThrow({
        where: {
          id: input,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          stock: true,
          width: true,
          height: true,
          price: true,
          forSale: true,
          artwork: {
            select: {
              id: true,
              name: true,
            },
          },
          shopCategory: {
            select: {
              id: true,
              name: true,
              parentCategory: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return {
        product: {
          ...product,
          shopCategory: {
            label:  `${product.shopCategory.parentCategory.name ?? '-'} | ${product.shopCategory.name ?? '-'}`,
            value: product.shopCategory.id ?? 0
          },
        },
      };
    },
  })

  .query('getAllCategories', {
    async resolve() {
      const categories = await prisma.shopCategory.findMany({
        where: {
          parentCategoryId: {
            not: null,
          },
        },
        select: {
          id: true,
          name: true,
          parentCategory: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });

      return {
        shopCategories: categories.map((c) => ({
          value: c.id,
          label: `${c.parentCategory?.name} | ${c.name}`,
        })),
      };
    },
  });

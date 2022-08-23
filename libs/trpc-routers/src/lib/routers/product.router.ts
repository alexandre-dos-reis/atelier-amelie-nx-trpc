import { ucFirst } from '@atelier-amelie-nx-trpc/helpers';
import { productsListSchema, product } from '@atelier-amelie-nx-trpc/validation-schema';
import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';

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
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const product = await prisma.product.findFirstOrThrow({
        where: {
          id: input.id,
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
                  id: true,
                },
              },
            },
          },
        },
      });

      return {
        product,
      };
    },
  })

  .query('getAllCategories', {
    async resolve() {
      const shopCategories = await prisma.shopCategory.findMany({
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
        orderBy: {
          parentCategory: {
            name: 'asc'
          }
        },
      });

      return {
        shopCategories,
      };
    },
  })

  .query('getAllArtworks', {
    async resolve() {
      const artworks = await prisma.artwork.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return {
        artworks,
      };
    },
  })

  .mutation('updateOne', {
    input: product.updateOrCreateOneSchema,
    async resolve({ input }) {
      return {
        product: await prisma.product.update({
          where: {
            id: input.id,
          },
          include: {
            shopCategory: { include: { parentCategory: true } },
            artwork: true,
          },
          data: {
            name: ucFirst(input.name),
            slug: input.slug,
            description: input.description,
            height: input.height,
            width: input.width,
            forSale: input.forSale,
            price: input.price,
            stock: input.stock,
            shopCategoryId: input.shopCategory.value,
            artworkId: input.artwork.value,
          },
        }),
      };
    },
  })

  .mutation('createOne', {
    input: product.updateOrCreateOneSchema,
    async resolve({ input }) {
      const product = await prisma.product.create({
        include: {
          shopCategory: { include: { parentCategory: true } },
          artwork: true,
        },
        data: {
          name: ucFirst(input.name),
          slug: input.slug,
          description: input.description,
          height: input.height,
          width: input.width,
          forSale: input.forSale,
          price: input.price,
          stock: input.stock,
          artwork: {
            connect: {
              id: input.artwork.value,
            },
          },
          shopCategory: {
            connect: {
              id: input.shopCategory.value,
            },
          },
        },
      });
      return {
        product,
      };
    },
  })

  .mutation('deleteOne', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      return {
        product: await prisma.product.delete({
          where: {
            id: input.id,
          },
        }),
      };
    },
  });

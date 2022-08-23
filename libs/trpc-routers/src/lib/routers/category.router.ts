import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@atelier-amelie-nx-trpc/prisma';
import { category } from '@atelier-amelie-nx-trpc/validation-schema';

export const CategoryRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          updatedAt: true,
          name: true,
          disposition: true,
          showInGallery: true,
          artworks: {
            select: {
              id: true
            },
          },
        },
        orderBy: {
          disposition: 'asc',
        },
      });
      return {
        categories: categories.map((c) => ({
          ...c,
          showInGallery: c.showInGallery,
        })),
      };
    },
  })

  .query('getOne', {
    input: z.number(),
    async resolve({ input }) {
      const category = await prisma.category.findUniqueOrThrow({
        where: {
          id: input,
        },
        select: {
          id: true,
          description: true,
          name: true,
          slug: true,
          showInGallery: true,
        },
      });
      return {
        category,
      };
    },
  })

  .mutation('reOrder', {
    input: z.array(
      z.object({
        id: z.number().positive(),
        disposition: z.number().positive(),
      })
    ),
    async resolve({ input }) {
      return await Promise.all(
        input.map((i) =>
          prisma.category.update({
            where: {
              id: i.id,
            },
            data: {
              disposition: i.disposition,
            },
          })
        )
      );
    },
  })

  .mutation('updateOne', {
    input: category.updateOrCreateOneSchema,
    async resolve({ input }) {
      const category = await prisma.category.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return {
        category,
      };
    },
  })

  .mutation('createOne', {
    input: category.updateOrCreateOneSchema,

    async resolve({ input }) {
      const {
        _max: { disposition: maxDisposition },
      } = await prisma.category.aggregate({
        _max: {
          disposition: true,
        },
      });

      const category = await prisma.category.create({
        data: {
          name: input.name,
          slug: input.slug,
          description: input.description,
          disposition: (maxDisposition ?? 0) + 1,
        },
        select: {
          id: true,
          updatedAt: true,
          name: true,
          disposition: true,
          showInGallery: true,
          artworks: {
            select: {
              id: true,
            },
          },
        },
      });

      return {
        category,
        artworksLength: category.artworks.length,
      };
    },
  })

  .mutation('deleteOne', {
    input: z.object({
      id: z.number().positive(),
    }),

    async resolve({ input }) {
      const category = await prisma.category.delete({
        where: {
          id: input.id,
        },
      });

      return {
        category,
      };
    },
  });

import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../utils/prisma';

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
              _count: true,
            },
          },
        },
        orderBy: {
          disposition: 'asc',
        },
      });
      return {
        categories: categories.map((c) => ({
          id: c.id,
          updatedAt: c.updatedAt,
          name: c.name,
          disposition: c.disposition,
          showInGallery: c.showInGallery,
          artworksLength: c.artworks.length,
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
  });

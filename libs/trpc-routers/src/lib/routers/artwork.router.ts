import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../utils/prisma';
import { updateOrCreateOneSchema } from '@atelier-amelie-nx-trpc/validation-schema';

export const ArtworkRouter = trpc
  .router()

  .query('getAll', {
    async resolve() {
      return {
        artworks: await prisma.artwork.findMany({
          include: {
            categories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            updatedAt: 'desc',
          },
        }),
      };
    },
  })

  .query('getOne', {
    input: z.number(),
    async resolve({ input }) {
      return {
        artwork: await prisma.artwork.findUniqueOrThrow({
          where: {
            id: input,
          },
          include: {
            categories: true,
          },
        }),
      };
    },
  })

  .mutation('updateOne', {
    input: updateOrCreateOneSchema,
    async resolve({ input }) {
      return {
        artwork: await prisma.artwork.update({
          where: {
            id: input.id,
          },
          include: {
            categories: true,
          },
          data: {
            name: input.name,
            slug: input.slug,
            description: input.description,
            showInGallery: input.showInGallery,
            showInPortfolio: input.showInPortfolio,
            madeAt: input.madeAt,
            categories: {
              set: input.categories.map((c) => ({ id: c.value })),
            },
          },
        }),
      };
    },
  })

  .mutation('createOne', {
    input: updateOrCreateOneSchema,
    async resolve({ input }) {
      return {
        artwork: await prisma.artwork.update({
          where: {
            id: input.id,
          },
          include: {
            categories: true,
          },
          data: {
            name: input.name,
            slug: input.slug,
            description: input.description,
            showInGallery: input.showInGallery,
            showInPortfolio: input.showInPortfolio,
            madeAt: input.madeAt,
            categories: {
              set: input.categories.map((c) => ({ id: c.value })),
            },
          },
        }),
      };
    },
  });
